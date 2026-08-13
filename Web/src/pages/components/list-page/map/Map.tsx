import { Circle, CircleMarker, MapContainer, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import './map.css';
import 'leaflet/dist/leaflet.css';

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

/**
 * Region-only markers (one per city).
 * No individual property pins — keeps the map fast.
 * Clicking a region calls onRegionSelect(city, country).
 */
function RegionPins({ items = [], onRegionSelect }) {
	const map = useMap();

	const cityPins = useMemo(() => {
		const list = Array.isArray(items) ? items : [];
		if (!list.length) return [];

		const byCity = Object.create(null);

		for (let i = 0; i < list.length; i++) {
			const item = list[i];
			if (!item) continue;
			const lat = Number(item.latitude);
			const lng = Number(item.longitude);
			if (Number.isNaN(lat) || Number.isNaN(lng)) continue;
			const key = String(item.country || '') + '::' + String(item.city || 'Unknown');
			if (!byCity[key]) {
				byCity[key] = {
					key,
					city: item.city || 'Unknown',
					country: item.country || '',
					latSum: 0,
					lngSum: 0,
					count: 0,
				};
			}
			byCity[key].latSum += lat;
			byCity[key].lngSum += lng;
			byCity[key].count += 1;
		}

		return Object.keys(byCity).map((k) => {
			const g = byCity[k];
			return {
				key: g.key,
				city: g.city,
				country: g.country,
				count: g.count,
				latitude: g.latSum / g.count,
				longitude: g.lngSum / g.count,
			};
		});
	}, [items]);

	return (
		<>
			{cityPins.map((c) => (
				<CircleMarker
					key={c.key}
					center={[c.latitude, c.longitude]}
					radius={Math.min(10 + Math.log2(c.count + 1) * 2.5, 24)}
					pathOptions={{
						color: '#0F766E',
						fillColor: '#14B8A6',
						fillOpacity: 0.88,
						weight: 2,
					}}
					eventHandlers={{
						click: (e) => {
							// Don't bubble to map click (area select)
							L.DomEvent.stopPropagation(e);
							onRegionSelect?.({
								city: c.city,
								country: c.country,
								latitude: c.latitude,
								longitude: c.longitude,
								count: c.count,
							});
							map.setView([c.latitude, c.longitude], 11, { animate: true });
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
								<span>{c.count.toLocaleString()} properties in this area</span>
								<button
									type="button"
									className="popup-details-btn"
									style={{
										marginTop: 8,
										display: 'inline-block',
										padding: '6px 12px',
										borderRadius: 999,
										background: '#0F766E',
										color: '#fff',
										border: 'none',
										fontWeight: 600,
										cursor: 'pointer',
									}}
									onClick={(ev) => {
										ev.preventDefault();
										ev.stopPropagation();
										onRegionSelect?.({
											city: c.city,
											country: c.country,
											latitude: c.latitude,
											longitude: c.longitude,
											count: c.count,
										});
									}}
								>
									Show listings →
								</button>
							</div>
						</div>
					</Popup>
				</CircleMarker>
			))}
		</>
	);
}

function PropertyMap(props) {
	const {
		items = [],
		expanded,
		onExpand,
		onClose,
		selectedLocation,
		onLocationSelect,
		onRegionSelect,
		radiusKm = 5,
		simple = false,
		showAreaHint = true,
	} = props || {};

	const safeItems = Array.isArray(items) ? items : [];
	const radiusMeters = Number(radiusKm) * 1000;
	const isSimple = simple || expanded === undefined;

	const center = useMemo(() => {
		if (safeItems.length === 1) {
			return [Number(safeItems[0].latitude), Number(safeItems[0].longitude)];
		}
		return [50.0, 10.0];
	}, [safeItems]);

	const zoomLevel =
		safeItems.length === 1 ? 14 : safeItems.length > 50 ? 6 : 11;

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
							<strong>Choose a region</strong>
							<span>Click a green pin to list homes in that city</span>
						</div>
					) : expanded && !showAreaHint ? (
						<div>
							<strong>Explore regions</strong>
							<span>Click a pin to filter listings</span>
						</div>
					) : !expanded ? (
						<div>
							<strong>Explore on the map</strong>
							<span>
								Click to expand — {safeItems.length.toLocaleString()} listings
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
				zoom={zoomLevel}
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
				<RegionPins items={safeItems} onRegionSelect={onRegionSelect} />

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

export default PropertyMap;
