import { Marker, Popup } from 'react-leaflet';
import './pin.css';

function Pin({ item }) {
	const lat = Number(item.latitude);
	const lng = Number(item.longitude);

	if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

	return (
		<Marker position={[lat, lng]}>
			<Popup>
				<div className="popupContainer">
					{item.images?.[0] && (
						<img src={item.images[0]} alt={item.title || ''} />
					)}
					<div className="textContainer">
						<span className="title">{item.title}</span>
						{item.bedroom != null && (
							<span>{item.bedroom} bedroom</span>
						)}
						<b>€ {Number(item.price).toLocaleString()}</b>
					</div>
				</div>
			</Popup>
		</Marker>
	);
}

export default Pin;
