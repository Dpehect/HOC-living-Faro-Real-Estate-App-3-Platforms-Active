import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import './map.css';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

// Fix default Leaflet marker icons (Vite / bundler issue)
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

function ResizeMap({ expanded }) {
	const map = useMap();
	useEffect(() => {
		const timer = window.setTimeout(() => {
			map.invalidateSize();
			// Ensure we stay centered on Faro after resize
			if (!expanded) {
				map.setView([37.0194, -7.9304], 12);
			}
		}, 100);
		return () => window.clearTimeout(timer);
	}, [expanded, map]);
	return null;
}

function Map({ items, expanded, onExpand, onClose, selectedLocation, onLocationSelect }) {
	return (
		<div className={expanded ? 'map-shell map-shell--expanded' : 'map-shell'}>
			{/* Toolbar */}
			<div className="map-toolbar">
				{expanded ? (
					selectedLocation ? (
						<div>
							<strong>Area selected</strong>
							<span>Showing homes within the selected radius</span>
						</div>
					) : (
						<div>
							<strong>Choose an area in Faro</strong>
							<span>Click anywhere to filter nearby homes</span>
						</div>
					)
				) : (
					<div>
						<strong>Explore on the map</strong>
						<span>Click to expand and choose a location</span>
					</div>
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
				scrollWheelZoom={expanded}
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
				<ResizeMap expanded={expanded} />
				{items.map((item) => (
					<Pin item={item} key={item.id} />
				))}
				{selectedLocation && (
					<CircleMarker
						center={[selectedLocation.latitude, selectedLocation.longitude]}
						radius={12}
						pathOptions={{
							color: '#4f46e5',
							fillColor: '#6366f1',
							fillOpacity: 0.9,
							weight: 4,
						}}
					/>
				)}
			</MapContainer>

			{expanded && selectedLocation && (
				<div className="map-selection">Showing homes within the selected radius</div>
			)}
		</div>
	);
}

export default Map;
