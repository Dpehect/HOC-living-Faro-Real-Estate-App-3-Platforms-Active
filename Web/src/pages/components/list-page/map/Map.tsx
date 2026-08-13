import { Circle, CircleMarker, MapContainer, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useMemo } from 'react';
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

export type RegionPin = {
	city: string;
	country: string;
	count: number;
	latitude: number;
	longitude: number;
};

function MapEvents({ expanded, onExpand }) {
	useMapEvents({
		click() {
			if (!expanded) onExpand?.();
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

/** One pin per city across all Europe — popup only; filter on button click */
function RegionPins({ regions = [], onRegionSelect }) {
	const map = useMap();

	const pins = useMemo(() => {
		const list = Array.isArray(regions) ? regions : [];
		return list.filter(
			(c) =>
				c &&
				!Number.isNaN(Number(c.latitude)) &&
				!Number.isNaN(Number(c.longitude))
		);
	}, [regions]);

	return (
		<>
			{pins.map((c) => {
				const key = `${c.country}::${c.city}`;
				const count = Number(c.count) || 0;
				return (
					<CircleMarker
						key={key}
						center={[Number(c.latitude), Number(c.longitude)]}
						radius={Math.min(9 + Math.log2(count + 1) * 2, 20)}
						pathOptions={{
							color: '#0F766E',
							fillColor: '#14B8A6',
							fillOpacity: 0.88,
							weight: 2,
						}}
						eventHandlers={{
							click: (e) => {
								L.DomEvent.stopPropagation(e);
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
									<span style={{ display: 'block', marginTop: 4 }}>
										{count.toLocaleString()} properties in this area
									</span>
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
												latitude: Number(c.latitude),
												longitude: Number(c.longitude),
												count,
											});
										}}
									>
										Show listings →
									</button>
								</div>
							</div>
						</Popup>
					</CircleMarker>
				);
			})}
		</>
	);
}

function PropertyMap(props) {
	const {
		regions = [],
		items = [],
		expanded,
		onExpand,
		onClose,
		selectedLocation,
		onRegionSelect,
		radiusKm = 5,
		simple = false,
		showAreaHint = true,
	} = props || {};

	const regionList = Array.isArray(regions) && regions.length
		? regions
		: // fallback: derive from items if regions not provided
			(() => {
				const list = Array.isArray(items) ? items : [];
				const byCity = Object.create(null);
				for (const item of list) {
					if (!item) continue;
					const lat = Number(item.latitude);
					const lng = Number(item.longitude);
					if (Number.isNaN(lat) || Number.isNaN(lng)) continue;
					const key = `${item.country || ''}::${item.city || 'Unknown'}`;
					if (!byCity[key]) {
						byCity[key] = {
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
						city: g.city,
						country: g.country,
						count: g.count,
						latitude: g.latSum / g.count,
						longitude: g.lngSum / g.count,
					};
				});
			})();

	const radiusMeters = Number(radiusKm) * 1000;
	const isSimple = simple || expanded === undefined;
	const totalListings = regionList.reduce((s, r) => s + (Number(r.count) || 0), 0);

	const center = useMemo(() => [50.0, 10.0], []);
	const zoomLevel = 5;

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
					{expanded ? (
						<div>
							<strong>Choose a city</strong>
							<span>Click a pin · Show listings for that city</span>
						</div>
					) : (
						<div>
							<strong>Explore Europe</strong>
							<span>
								{regionList.length} cities · {totalListings.toLocaleString()} listings
							</span>
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
				{!isSimple && <MapEvents expanded={expanded} onExpand={onExpand} />}
				<MapControls expanded={expanded} />
				<RegionPins regions={regionList} onRegionSelect={onRegionSelect} />

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
