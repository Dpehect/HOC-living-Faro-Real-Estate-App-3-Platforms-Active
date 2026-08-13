import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellHomeSection = () => {
	const [city, setCity] = useState('');
	const navigate = useNavigate();

	return (
		<div className="w-full py-12 bg-bgColor px-4">
			<h2 className="text-3xl mx-auto w-full text-center font-bold text-gray-800 mb-3">
				Ready to sell or let your property?
			</h2>
			<p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
				Enter your city and request a free consultation. We cover 539 locations across Europe.
			</p>
			<form
				className="flex flex-col sm:flex-row justify-center items-center gap-3 md:w-1/2 mx-auto"
				onSubmit={(e) => {
					e.preventDefault();
					navigate(city.trim() ? `/sell?city=${encodeURIComponent(city.trim())}` : '/sell');
				}}
			>
				<Input
					type="text"
					placeholder="City (e.g. Berlin, Paris, Amsterdam, Stockholm)"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className="px-4 py-2 w-full sm:w-2/3 border border-gray-300 rounded-md"
				/>
				<Button type="submit" className="px-6 py-3 text-white font-semibold rounded-md shadow-md bg-primary hover:bg-accentHover w-full sm:w-auto">
					Get started
				</Button>
			</form>
			<p className="text-center mt-4 text-sm">
				<Link to="/home-value" className="text-primary font-semibold hover:underline">
					Or get an instant home value estimate →
				</Link>
			</p>
		</div>
	);
};

export default SellHomeSection;
