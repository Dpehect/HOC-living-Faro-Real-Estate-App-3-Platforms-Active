import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageShell from '@/components/PageShell';
import citiesList from './citiesList.json';

export default function SellPage() {
	const [sent, setSent] = useState(false);
	const [city, setCity] = useState('');
	const [cityOpen, setCityOpen] = useState(false);
	const cityWrapRef = useRef<HTMLDivElement>(null);

	const suggestions = useMemo(() => {
		const q = city.trim().toLowerCase();
		if (!q) return (citiesList as string[]).slice(0, 12);
		return (citiesList as string[])
			.filter((c) => c.toLowerCase().includes(q))
			.slice(0, 12);
	}, [city]);

	useEffect(() => {
		const onDoc = (e: MouseEvent) => {
			if (!cityWrapRef.current?.contains(e.target as Node)) setCityOpen(false);
		};
		document.addEventListener('mousedown', onDoc);
		return () => document.removeEventListener('mousedown', onDoc);
	}, []);

	return (
		<PageShell
			title="Sell or list your property"
			subtitle="List with HOC Living and reach serious buyers and tenants across München and Bayern."
		>
			<div className="mb-8 grid gap-4 sm:grid-cols-3">
				{[
					{ t: 'Professional photos', d: 'We arrange quality visuals that highlight your home.' },
					{ t: 'Wide exposure', d: 'Your listing appears on our site and partner portals.' },
					{ t: 'Dedicated agent', d: 'One specialist guides you from valuation to completion.' },
				].map((x) => (
					<div key={x.t} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
						<h3 className="font-bold text-gray-900">{x.t}</h3>
						<p className="mt-2 text-sm text-gray-600">{x.d}</p>
					</div>
				))}
			</div>

			<div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
				<h2 className="text-xl font-bold text-gray-900">Request a listing consultation</h2>
				{sent ? (
					<p className="mt-4 text-emerald-700">
						Thank you. An agent will contact you to arrange a visit
						{city ? ` in ${city}` : ''}.
					</p>
				) : (
					<form
						className="mt-4 grid gap-4 sm:grid-cols-2"
						onSubmit={(e) => {
							e.preventDefault();
							setSent(true);
						}}
					>
						<Input placeholder="Full name" required className="h-11 rounded-xl" />
						<Input type="email" placeholder="Email" required className="h-11 rounded-xl" />

						{/* City autocomplete */}
						<div ref={cityWrapRef} className="relative sm:col-span-2">
							<label className="mb-1.5 block text-sm font-medium text-gray-700">Property city</label>
							<Input
								placeholder="Start typing — e.g. Schwabing, Maxvorstadt, Bogenhausen"
								value={city}
								onChange={(e) => {
									setCity(e.target.value);
									setCityOpen(true);
								}}
								onFocus={() => setCityOpen(true)}
								required
								autoComplete="off"
								className="h-11 rounded-xl"
							/>
							{cityOpen && suggestions.length > 0 && (
								<ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
									{suggestions.map((c) => (
										<li key={c}>
											<button
												type="button"
												className="flex w-full px-3 py-2 text-left text-sm text-gray-800 hover:bg-emerald-50 hover:text-primary"
												onClick={() => {
													setCity(c);
													setCityOpen(false);
												}}
											>
												{c}
											</button>
										</li>
									))}
								</ul>
							)}
							<p className="mt-1 text-xs text-gray-400">
								{(citiesList as string[]).length} cities — click a suggestion or keep typing
							</p>
						</div>

						<select className="h-11 rounded-xl border border-input bg-background px-3 text-sm" defaultValue="sale">
							<option value="sale">I want to sell</option>
							<option value="let">I want to let</option>
						</select>

						<textarea
							placeholder="Brief description of the property (optional)"
							rows={4}
							className="rounded-xl border border-input bg-background px-3 py-2 text-sm sm:col-span-2"
						/>

						<Button
							type="submit"
							className="h-12 rounded-xl bg-primary text-white hover:bg-accentHover sm:col-span-2 sm:w-auto sm:px-8"
						>
							Request consultation
						</Button>
					</form>
				)}
			</div>
		</PageShell>
	);
}
