import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MicroscopeIcon } from '@/icons/landing-page-icons';

type CityRow = {
	city: string;
	country: string;
	count?: number;
	latitude?: number;
	longitude?: number;
};

type Suggestion =
	| { kind: 'country'; label: string; country: string }
	| { kind: 'city'; label: string; city: string; country: string };

export default function EuropeSearch({
	className = '',
	compact = false,
}: {
	className?: string;
	compact?: boolean;
}) {
	const navigate = useNavigate();
	const [query, setQuery] = useState('');
	const [cities, setCities] = useState<CityRow[]>([]);
	const [countries, setCountries] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	const [activeIdx, setActiveIdx] = useState(0);
	const wrapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetch('/data/cities.json')
			.then((r) => r.json())
			.then((data) => {
				const list: CityRow[] = Array.isArray(data) ? data : [];
				setCities(list);
				const uniq = Array.from(new Set(list.map((c) => c.country).filter(Boolean))).sort();
				setCountries(uniq);
			})
			.catch(() => {
				setCities([]);
				setCountries([]);
			});
	}, []);

	useEffect(() => {
		const onDoc = (e: MouseEvent) => {
			if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('mousedown', onDoc);
		return () => document.removeEventListener('mousedown', onDoc);
	}, []);

	const suggestions: Suggestion[] = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		const out: Suggestion[] = [];
		for (const c of countries) {
			if (c.toLowerCase().includes(q)) {
				out.push({ kind: 'country', label: c, country: c });
			}
		}
		for (const row of cities) {
			if (
				row.city.toLowerCase().includes(q) ||
				row.country.toLowerCase().includes(q)
			) {
				out.push({
					kind: 'city',
					label: `${row.city}, ${row.country}`,
					city: row.city,
					country: row.country,
				});
			}
		}
		// prefer exact / prefix matches
		out.sort((a, b) => {
			const al = a.label.toLowerCase();
			const bl = b.label.toLowerCase();
			const ap = al.startsWith(q) ? 0 : 1;
			const bp = bl.startsWith(q) ? 0 : 1;
			if (ap !== bp) return ap - bp;
			if (a.kind !== b.kind) return a.kind === 'country' ? -1 : 1;
			return al.localeCompare(bl);
		});
		return out.slice(0, 12);
	}, [query, cities, countries]);

	const go = (s?: Suggestion) => {
		const pick = s || suggestions[activeIdx];
		if (pick?.kind === 'city') {
			navigate(
				`/listings?country=${encodeURIComponent(pick.country)}&q=${encodeURIComponent(pick.city)}`
			);
			setOpen(false);
			return;
		}
		if (pick?.kind === 'country') {
			navigate(`/listings?country=${encodeURIComponent(pick.country)}`);
			setOpen(false);
			return;
		}
		const q = query.trim();
		if (!q) {
			navigate('/listings');
			return;
		}
		// free text: try match country first, else pass as q with Germany default or first match
		const countryHit = countries.find((c) => c.toLowerCase() === q.toLowerCase());
		if (countryHit) {
			navigate(`/listings?country=${encodeURIComponent(countryHit)}`);
			return;
		}
		const cityHit = cities.find((c) => c.city.toLowerCase() === q.toLowerCase());
		if (cityHit) {
			navigate(
				`/listings?country=${encodeURIComponent(cityHit.country)}&q=${encodeURIComponent(cityHit.city)}`
			);
			return;
		}
		navigate(`/listings?q=${encodeURIComponent(q)}`);
	};

	return (
		<div ref={wrapRef} className={`relative w-full ${className}`}>
			<div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden">
				<Input
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setOpen(true);
						setActiveIdx(0);
					}}
					onFocus={() => setOpen(true)}
					onKeyDown={(e) => {
						if (e.key === 'ArrowDown') {
							e.preventDefault();
							setActiveIdx((i) => Math.min(i + 1, Math.max(suggestions.length - 1, 0)));
						} else if (e.key === 'ArrowUp') {
							e.preventDefault();
							setActiveIdx((i) => Math.max(i - 1, 0));
						} else if (e.key === 'Enter') {
							e.preventDefault();
							go();
						} else if (e.key === 'Escape') {
							setOpen(false);
						}
					}}
					placeholder="Search city or country (e.g. Reykjavik, Germany)"
					className="flex-grow px-4 py-2 border-0 focus-visible:ring-0"
					autoComplete="off"
				/>
				<Button
					type="button"
					className="bg-primary text-white px-4 py-2 rounded-none"
					onClick={() => go()}
					aria-label="Search"
				>
					<MicroscopeIcon className="h-5 w-5" />
				</Button>
			</div>

			{open && suggestions.length > 0 && (
				<ul
					className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
					role="listbox"
				>
					{suggestions.map((s, idx) => (
						<li key={`${s.kind}-${s.label}-${idx}`} role="option" aria-selected={idx === activeIdx}>
							<button
								type="button"
								className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
									idx === activeIdx ? 'bg-teal-50 text-teal-900' : 'hover:bg-gray-50'
								}`}
								onMouseEnter={() => setActiveIdx(idx)}
								onClick={() => go(s)}
							>
								<span className="font-medium">{s.label}</span>
								<span className="text-xs uppercase tracking-wide text-gray-400">
									{s.kind === 'country' ? 'Country' : 'City'}
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
