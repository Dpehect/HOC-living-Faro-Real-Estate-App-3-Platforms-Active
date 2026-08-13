import { Circle, CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
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

const MAX_MARKERS = 400;

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

function VisiblePins({ items }) {
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

	const visible = useMemo(() => {
		if (!items?.length) return [];
		if (!bounds) return items.slice(0, Math.min(items.length, 50));
		const limit = zoom < 9 ? 80 : zoom < 11 ? 180 : MAX_MARKERS;
		const inView = [];
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
		return inView;
	}, [items, bounds, zoom]);

	return (
		<>
			{visible.map((item) => (
				<Pin item={item} key={item.id} />
			))}
		</>
	);
}

function Map({
	items = [],
	expanded,
	onExpand,
	onClose,
	selectedLocation,
	onLocationSelect,
	radiusKm = 5,
	simple = false,
	showAreaHint = true,
}) {
	const radiusMeters = Number(radiusKm) * 1000;
	const isSimple = simple || expanded === undefined;

	const center = useMemo(() => {
		if (items.length === 1) {
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
				zoom={items.length === 1 ? 14 : 12}
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
