import { Circle, CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';
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
		const timer = window.setTimeout(() => {
			map.invalidateSize();
		}, 120);
		return () => window.clearTimeout(timer);
	}, [expanded, map]);

	// Mouse wheel zoom + dragging — expanded iken kesin aç
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
						<span>Click anywhere to filter nearby homes</span>
					</div>
				) : !expanded ? (
					<div>
						<strong>Explore on the map</strong>
						<span>Click to expand and choose a location</span>
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

				{items.map((item) => (
					<Pin item={item} key={item.id} />
				))}

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
