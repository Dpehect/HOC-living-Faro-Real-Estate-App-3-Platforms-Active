import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageShell from '@/components/PageShell';
import citiesList from './citiesList.json';

const PROPERTY_TYPES = [
	{ value: 'apartment', label: 'Apartment' },
	{ value: 'house', label: 'House' },
	{ value: 'condo', label: 'Condo' },
	{ value: 'land', label: 'Land' },
];

const BED_OPTIONS = [1, 2, 3, 4, 5];
const SIZE_PRESETS = [
	{ label: 'Studio / small', value: 500 },
	{ label: '~70 m²', value: 750 },
	{ label: '~100 m²', value: 1100 },
	{ label: '~130 m²', value: 1400 },
	{ label: '~160 m²', value: 1700 },
	{ label: 'Large 180 m²+', value: 2000 },
];

export default function HomeValuePage() {
	const [city, setCity] = useState('');
	const [cityOpen, setCityOpen] = useState(false);
	const [propertyType, setPropertyType] = useState('');
	const [bedrooms, setBedrooms] = useState<number | ''>('');
	const [size, setSize] = useState<number | ''>('');
	const [result, setResult] = useState<string | null>(null);
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

	const estimate = () => {
		const baseByType: Record<string, number> = {
			apartment: 220000,
			house: 320000,
			condo: 260000,
			land: 120000,
		};
		const base = baseByType[propertyType] || 250000;
		const cityBoost = [
			'Lisbon',
			'Cascais',
			'Madrid',
			'Barcelona',
			'Marbella',
			'Porto',
			'Faro',
			'Lagos',
			'Albufeira',
		].includes(city.trim())
			? 1.25
			: 1;
		const bedFactor = 1 + (Number(bedrooms) || 2) * 0.08;
		const sizeFactor = 1 + (Number(size) || 1000) / 5000;
		const mid = Math.round(base * cityBoost * bedFactor * sizeFactor);
		const low = Math.round(mid * 0.9);
		const high = Math.round(mid * 1.12);
		setResult(`€ ${low.toLocaleString()} – € ${high.toLocaleString()}`);
	};

	return (
		<PageShell
			title="Home value"
			subtitle="Get a free indicative valuation. Start typing a city for suggestions — size is optional if you are unsure."
		>
			<div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
				{result ? (
					<div className="text-center">
						<p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Indicative range</p>
						<p className="mt-2 text-3xl font-bold text-primary">{result}</p>
						<p className="mt-2 text-sm text-gray-500">
							Based on {city || 'your area'}
							{propertyType ? ` · ${propertyType}` : ''}
							{bedrooms !== '' ? ` · ${bedrooms} bed` : ''}
							{size !== '' ? ` · ~${size} sqft` : ''}
						</p>
						<p className="mt-3 text-sm text-gray-500">
							Automated estimate only. Book a free visit for a precise valuation.
						</p>
						<Button
							className="mt-6 rounded-xl bg-primary text-white hover:bg-accentHover"
							onClick={() => setResult(null)}
						>
							New estimate
						</Button>
					</div>
				) : (
					<form
						className="space-y-5"
						onSubmit={(e) => {
							e.preventDefault();
							estimate();
						}}
					>
						<div ref={cityWrapRef} className="relative">
							<label className="mb-1.5 block text-sm font-medium text-gray-700">City / location</label>
							<Input
								placeholder="Start typing — e.g. Faro, Lisbon, Marbella"
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

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">Property type</label>
							<div className="flex flex-wrap gap-2">
								{PROPERTY_TYPES.map((t) => (
									<button
										key={t.value}
										type="button"
										onClick={() => setPropertyType(t.value)}
										className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
											propertyType === t.value
												? 'border-primary bg-primary text-white'
												: 'border-gray-200 bg-white text-gray-700 hover:border-primary/40'
										}`}
									>
										{t.label}
									</button>
								))}
							</div>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Bedrooms <span className="font-normal text-gray-400">(optional)</span>
							</label>
							<div className="flex flex-wrap gap-2">
								{BED_OPTIONS.map((n) => (
									<button
										key={n}
										type="button"
										onClick={() => setBedrooms(n)}
										className={`h-10 w-10 rounded-xl border text-sm font-semibold transition ${
											bedrooms === n
												? 'border-primary bg-primary text-white'
												: 'border-gray-200 bg-white text-gray-700 hover:border-primary/40'
										}`}
									>
										{n}
									</button>
								))}
								<button
									type="button"
									onClick={() => setBedrooms('')}
									className="rounded-xl border border-gray-200 px-3 text-xs text-gray-500"
								>
									Skip
								</button>
							</div>
						</div>

						<div>
							<label className="mb-1.5 block text-sm font-medium text-gray-700">
								Approximate size <span className="font-normal text-gray-400">(optional)</span>
							</label>
							<div className="flex flex-wrap gap-2">
								{SIZE_PRESETS.map((s) => (
									<button
										key={s.value}
										type="button"
										onClick={() => setSize(s.value)}
										className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
											size === s.value
												? 'border-primary bg-primary text-white'
												: 'border-gray-200 bg-white text-gray-700 hover:border-primary/40'
										}`}
									>
										{s.label}
									</button>
								))}
							</div>
							<Input
								type="number"
								min={0}
								placeholder="Or type sqft"
								value={size === '' ? '' : size}
								onChange={(e) => setSize(e.target.value ? Number(e.target.value) : '')}
								className="mt-2 h-10 max-w-[160px] rounded-xl"
							/>
						</div>

						<Button type="submit" className="h-12 w-full rounded-xl bg-primary text-white hover:bg-accentHover">
							Get free valuation
						</Button>
					</form>
				)}
			</div>
		</PageShell>
	);
}
