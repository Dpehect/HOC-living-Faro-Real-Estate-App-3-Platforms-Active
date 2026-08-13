import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './pin.css';

function Pin({ item }) {
	const lat = Number(item.latitude);
	const lng = Number(item.longitude);
	if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

	const price =
		item.type === 'rent'
			? `€ ${Number(item.price).toLocaleString()} / mo`
			: `€ ${Number(item.price).toLocaleString()}`;

	return (
		<Marker position={[lat, lng]}>
			<Popup>
				<div className="popupContainer">
					{item.images?.[0] && <img src={item.images[0]} alt="" />}
					<div className="textContainer">
						<strong>{item.title}</strong>
						<span>
							{item.city}
							{item.bedroom ? ` · ${item.bedroom} bed` : ''}
							{item.property ? ` · ${item.property}` : ''}
						</span>
						<b>{price}</b>
						<Link
							to={`/details/${item.id}`}
							className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-accentHover"
							onClick={(e) => e.stopPropagation()}
						>
							View details →
						</Link>
					</div>
				</div>
			</Popup>
		</Marker>
	);
}

export default Pin;
