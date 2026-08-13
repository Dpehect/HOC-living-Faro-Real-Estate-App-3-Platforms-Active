import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';
import './map.css';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

function MapEvents({ expanded, onExpand, onLocationSelect }) {
	useMapEvents({ click(event) { if (!expanded) onExpand(); else onLocationSelect({ latitude: event.latlng.lat, longitude: event.latlng.lng }); } });
	return null;
}

function ResizeMap({ expanded }) {
	const map = useMap();
	useEffect(() => { const timer = window.setTimeout(() => map.invalidateSize(), 80); return () => window.clearTimeout(timer); }, [expanded, map]);
	return null;
}

function Map({ items, expanded, onExpand, onClose, selectedLocation, onLocationSelect }) {
	return (
		<div className={expanded ? 'map-shell map-shell--expanded' : 'map-shell'}>
			{expanded && (
				<div className="map-toolbar">
					<div><strong>Choose an area in Faro</strong><span>Click anywhere to filter nearby homes</span></div>
					<button type="button" onClick={onClose}>Close map</button>
				</div>
			)}
			<MapContainer center={[37.0194, -7.9304]} zoom={12} scrollWheelZoom={expanded} className="map">
				<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<MapEvents expanded={expanded} onExpand={onExpand} onLocationSelect={onLocationSelect} />
				<ResizeMap expanded={expanded} />
				{items.map(item => <Pin item={item} key={item.id} />)}
				{selectedLocation && <CircleMarker center={[selectedLocation.latitude, selectedLocation.longitude]} radius={10} pathOptions={{ color: '#4f46e5', fillColor: '#6366f1', fillOpacity: .9, weight: 4 }} />}
			</MapContainer>
			{expanded && selectedLocation && <div className="map-selection">Showing homes within the selected radius</div>}
		</div>
	);
}

export default Map;
