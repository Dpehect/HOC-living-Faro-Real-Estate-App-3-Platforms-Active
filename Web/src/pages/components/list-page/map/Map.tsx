import { Circle, CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import './map.css';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
});

const MAX_MARKERS = 1200;

/** One pin per city when zoomed out; individual pins when zoomed in */
function VisiblePins({ items = [] }) {
	const map = useMap();
	const [bounds, setBounds] = useState(null);
	const [zoom, setZoom] = useState(map.getZoom());

	useEffect(() => {
		const update = () => {
			setBounds(map.getBounds());
			setZoom(map.getZoom());
		};
		update();
		map.on('moveend', update);
		map.on('zoomend', update);
		return () => {
			map.off('moveend', update);
			map.off('zoomend', update);
		};
	}, [map]);

	const cityPins = useMemo(() => {
		if (!items?.length) return [];
		const byCity = new Map();
		for (const item of items) {
			const lat = Number(item.latitude);
			const lng = Number(item.longitude);
			if (Number.isNaN(lat) || Number.isNaN(lng)) continue;
			const key = `${item.country || ''}::${item.city || 'Unknown'}`;
			if (!byCity.has(key)) {
				byCity.set(key, {
					key,
					city: item.city || 'Unknown',
					country: item.country || '',
					latSum: 0,
					lngSum: 0,
					count: 0,
					sample: item,
				});
			}
			const g = byCity.get(key);
			g.latSum += lat;
			g.lngSum += lng;
			g.count += 1;
		}
		return Array.from(byCity.values()).map((g) => ({
			...g,
			latitude: g.latSum / g.count,
			longitude: g.lngSum / g.count,
		}));
	}, [items]);

	const visible = useMemo(() => {
		if (!items?.length) return { mode: 'none', list: [] };

		// Zoomed out: show one marker per city (all cities with listings)
		if (zoom < 10) {
			let list = cityPins;
			if (bounds) {
				list = cityPins.filter((c) =>
					bounds.contains([c.latitude, c.longitude])
				);
			}
			// Cap only if extreme
			if (list.length > 500) list = list.slice(0, 500);
			return { mode: 'city', list };
		}

		// Zoomed in: individual property pins
		const limit = zoom < 12 ? 400 : MAX_MARKERS;
		const inView = [];
		if (!bounds) {
			return { mode: 'pin', list: items.slice(0, Math.min(items.length, 150)) };
		}
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			const lat = Number(item.latitude);
			const lng = Number(item.longitude);
			if (Number.isNaN(lat) || Number.isNaN(lng)) continue;
			if (bounds.contains([lat, lng])) {
				inView.push(item);
				if (inView.length >= limit) break;
			}
		}
		return { mode: 'pin', list: inView };
	}, [items, bounds, zoom, cityPins]);

	if (visible.mode === 'city') {
		return (
			<>
				{visible.list.map((c) => (
					<CircleMarker
						key={c.key}
						center={[c.latitude, c.longitude]}
						radius={Math.min(8 + Math.log2(c.count + 1) * 3, 22)}
						pathOptions={{
							color: '#0F766E',
							fillColor: '#14B8A6',
							fillOpacity: 0.85,
							weight: 2,
						}}
						eventHandlers={{
							click: () => {
								map.setView([c.latitude, c.longitude], Math.max(zoom, 12), {
									animate: true,
								});
							},
						}}
					>
						<Popup>
							<div className="popupContainer">
								<div className="textContainer">
									<strong>
										{c.city}
										{c.country ? `, ${c.country}` : ''}
									</strong>
									<span>{c.count.toLocaleString()} properties</span>
									<span style={{ fontSize: 12, color: '#64748b' }}>
										Click pin or zoom in to see individual homes
									</span>
								</div>
							</div>
						</Popup>
					</CircleMarker>
				))}
			</>
		);
	}

	return (
		<>
			{visible.list.map((item) => (
				<Pin item={item} key={item.id} />
			))}
		</>
	);
}

function MapEvents({ expanded, onExpand, onLocationSelect }) {
	useMapEvents({
		click(event) {
			if (!onExpand && !onLocationSelect) return;
			if (!expanded) {
				onExpand?.();
			} else {
				onLocationSelect?.({
					latitude: event.latlng.lat,
					longitude: event.latlng.lng,
				});
			}
		},
	});
	return null;
}

function MapControls({ expanded }) {
	const map = useMap();

	useEffect(() => {
		const timer = window.setTimeout(() => map.invalidateSize(), 120);
		return () => window.clearTimeout(timer);
	}, [expanded, map]);

	useEffect(() => {
		if (expanded) {
			map.scrollWheelZoom.enable();
			map.dragging.enable();
			map.doubleClickZoom.enable();
		} else if (expanded === false) {
			map.scrollWheelZoom.disable();
			map.doubleClickZoom.disable();
		} else {
			map.scrollWheelZoom.enable();
			map.dragging.enable();
		}
	}, [expanded, map]);

	return null;
}

function Map(props) {
	const {
		items = [],
		expanded,
		onExpand,
		onClose,
		selectedLocation,
		onLocationSelect,
		radiusKm = 5,
		simple = false,
		showAreaHint = true,
	} = props || {};
	const radiusMeters = Number(radiusKm) * 1000;
	const isSimple = simple || expanded === undefined;

	const center = useMemo(() => {
		if (items && items.length === 1) {
			return [Number(items[0].latitude), Number(items[0].longitude)];
		}
		return [50.0, 10.0];
	}, [items]);

	return (
		<div
			className={
				expanded
					? 'map-shell map-shell--expanded'
					: isSimple
						? 'map-shell map-shell--simple'
						: 'map-shell'
			}
		>
			{!isSimple && (
				<div className="map-toolbar">
					{expanded && showAreaHint && !selectedLocation ? (
						<div>
							<strong>Choose an area</strong>
							<span>Zoom in & click a pin to open a property</span>
						</div>
					) : expanded && !showAreaHint ? (
						<div>
							<strong>Explore nearby</strong>
							<span>Click a pin · View details to open a listing</span>
						</div>
					) : !expanded ? (
						<div>
							<strong>Explore on the map</strong>
							<span>
								Click to expand — {items?.length?.toLocaleString?.() || 0} listings
							</span>
						</div>
					) : (
						<div style={{ visibility: 'hidden', width: 1, height: 1 }} />
					)}

					{expanded ? (
						<button type="button" onClick={onClose}>
							Close map
						</button>
					) : (
						<button type="button" onClick={onExpand}>
							Expand
						</button>
					)}
				</div>
			)}

			<MapContainer
				center={center}
				zoom={(items?.length || 0) === 1 ? 14 : (items?.length || 0) > 100 ? 6 : 11}
				scrollWheelZoom={isSimple || !!expanded}
				dragging={true}
				doubleClickZoom={isSimple || !!expanded}
				zoomControl={true}
				className="map"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{!isSimple && (
					<MapEvents
						expanded={expanded}
						onExpand={onExpand}
						onLocationSelect={onLocationSelect}
					/>
				)}
				<MapControls expanded={expanded} />
				<VisiblePins items={items} />

				{selectedLocation && (
					<>
						<CircleMarker
							center={[selectedLocation.latitude, selectedLocation.longitude]}
							radius={10}
							pathOptions={{
								color: '#059669',
								fillColor: '#34d399',
								fillOpacity: 1,
								weight: 3,
							}}
						/>
						<Circle
							center={[selectedLocation.latitude, selectedLocation.longitude]}
							radius={radiusMeters}
							pathOptions={{
								color: '#059669',
								fillColor: '#34d399',
								fillOpacity: 0.15,
								weight: 2,
								dashArray: '6 6',
							}}
						/>
					</>
				)}
			</MapContainer>

			{!isSimple && expanded && selectedLocation && (
				<div className="map-selection">
					Showing homes within {radiusKm} km of selected area
				</div>
			)}
		</div>
	);
}

export default Map;
