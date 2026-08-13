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

const MAX_MARKERS = 400; // tarayıcı performansı için limit

function MapEvents({ expanded, onExpand, onLocationSelect }) {
	useMapEvents({
		click(event) {
			if (!expanded) {
				onExpand();
			} else {
				onLocationSelect({
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
			map.boxZoom.enable();
			map.keyboard.enable();
		} else {
			map.scrollWheelZoom.disable();
			map.doubleClickZoom.disable();
		}
	}, [expanded, map]);

	return null;
}

/** Sadece görünür alandaki pin'leri göster — 10k marker kilitlemesin */
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
		if (!bounds || !items?.length) return [];
		// çok uzaktayken (zoom düşük) daha az pin
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
	items,
	expanded,
	onExpand,
	onClose,
	selectedLocation,
	onLocationSelect,
	radiusKm = 5,
}) {
	const radiusMeters = Number(radiusKm) * 1000;

	return (
		<div className={expanded ? 'map-shell map-shell--expanded' : 'map-shell'}>
			<div className="map-toolbar">
				{expanded && !selectedLocation ? (
					<div>
						<strong>Choose an area</strong>
						<span>Zoom in & click a pin to open a property</span>
					</div>
				) : !expanded ? (
					<div>
						<strong>Explore on the map</strong>
						<span>Click to expand — {items?.length?.toLocaleString?.() || 0} listings</span>
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

			<MapContainer
				center={[37.0194, -7.9304]}
				zoom={12}
				scrollWheelZoom={false}
				dragging={true}
				doubleClickZoom={false}
				zoomControl={true}
				className="map"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapEvents
					expanded={expanded}
					onExpand={onExpand}
					onLocationSelect={onLocationSelect}
				/>
				<MapControls expanded={expanded} />

				{/* Görünür alandaki taşınmaz pin'leri — tıklayınca popup */}
				<VisiblePins items={items} />

				{selectedLocation && (
					<>
						<CircleMarker
							center={[selectedLocation.latitude, selectedLocation.longitude]}
							radius={10}
							pathOptions={{
								color: '#4f46e5',
								fillColor: '#6366f1',
								fillOpacity: 1,
								weight: 3,
							}}
						/>
						<Circle
							center={[selectedLocation.latitude, selectedLocation.longitude]}
							radius={radiusMeters}
							pathOptions={{
								color: '#4f46e5',
								fillColor: '#6366f1',
								fillOpacity: 0.15,
								weight: 2,
								dashArray: '6 6',
							}}
						/>
					</>
				)}
			</MapContainer>

			{expanded && selectedLocation && (
				<div className="map-selection">
					Showing homes within {radiusKm} km of selected area
				</div>
			)}
		</div>
	);
}

export default Map;
