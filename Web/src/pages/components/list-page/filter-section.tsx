export type ListingFilters = { query: string; type: string; property: string; minPrice: string; maxPrice: string; bedrooms: string; radius: string };

const propertyTypes = [
	{ value: '', label: 'All homes' }, { value: 'apartment', label: 'Apartments' },
	{ value: 'house', label: 'Houses' }, { value: 'condo', label: 'Condos' }, { value: 'land', label: 'Land' },
];

export function Filter({ filters, onChange, onReset, resultCount, hasMapLocation }) {
	const update = (key: keyof ListingFilters, value: string) => onChange({ ...filters, [key]: value });
	const fieldClass = 'h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100';

	return (
		<section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_16px_50px_-35px_rgba(17,24,39,.35)]">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div><p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-600">European property search</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Find your place in Europe</h1><p className="mt-1 text-sm text-gray-500">{resultCount} {resultCount === 1 ? 'property' : 'properties'} available{hasMapLocation ? ' near your map pin' : ''}</p></div>
				<button type="button" onClick={onReset} className="text-sm font-semibold text-gray-500 transition hover:text-indigo-600">Clear filters</button>
			</div>
			<div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
				<label className="xl:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-gray-600">Location or keyword</span><input value={filters.query} onChange={event => update('query', event.target.value)} placeholder="Berlin, Paris, Stockholm, Oslo…" className={fieldClass} /></label>
				<label><span className="mb-1.5 block text-xs font-semibold text-gray-600">Min price (€)</span><input type="number" min="0" value={filters.minPrice} onChange={event => update('minPrice', event.target.value)} placeholder="No minimum" className={fieldClass} /></label>
				<label><span className="mb-1.5 block text-xs font-semibold text-gray-600">Max price (€)</span><input type="number" min="0" value={filters.maxPrice} onChange={event => update('maxPrice', event.target.value)} placeholder="No maximum" className={fieldClass} /></label>
			</div>
			<div className="mt-4 flex flex-wrap items-center gap-2">
				{['', 'buy', 'rent'].map(value => <button key={value || 'all'} type="button" onClick={() => update('type', value)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filters.type === value ? 'bg-gray-900 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{value === '' ? 'Buy & rent' : value === 'buy' ? 'For sale' : 'For rent'}</button>)}
				<span className="mx-1 hidden h-6 w-px bg-gray-200 sm:block" />
				{propertyTypes.map(option => <button key={option.value || 'all-properties'} type="button" onClick={() => update('property', option.value)} className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${filters.property === option.value ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>{option.label}</button>)}
			</div>
			<div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md">
				<label><span className="mb-1.5 block text-xs font-semibold text-gray-600">Bedrooms</span><select value={filters.bedrooms} onChange={event => update('bedrooms', event.target.value)} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-indigo-500"><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option></select></label>
				<label><span className="mb-1.5 block text-xs font-semibold text-gray-600">Map radius</span><select value={filters.radius} onChange={event => update('radius', event.target.value)} disabled={!hasMapLocation} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-45 focus:border-indigo-500"><option value="3">3 km</option><option value="5">5 km</option><option value="10">10 km</option><option value="20">20 km</option></select></label>
			</div>
		</section>
	);
}
