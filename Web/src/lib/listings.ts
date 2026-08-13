export type Listing = {
	id: number;
	title: string;
	price: number;
	images: string[];
	address: string;
	city: string;
	country?: string;
	bedroom: number;
	bathroom: number;
	latitude: number;
	longitude: number;
	type: string;
	property: string;
	postDetail: {
		desc: string;
		utilities: string;
		pet: string;
		income: string;
		size: number;
	};
};

type Manifest = {
	total: number;
	countries: { country: string; file: string; count: number }[];
};

const cache = new Map<string, Listing[]>();
let manifestPromise: Promise<Manifest> | null = null;

export async function getManifest(): Promise<Manifest> {
	if (!manifestPromise) {
		manifestPromise = fetch('/data/index.json').then((r) => r.json());
	}
	return manifestPromise;
}

export async function loadCountry(country: string): Promise<Listing[]> {
	const key = country.trim();
	if (cache.has(key)) return cache.get(key)!;
	const manifest = await getManifest();
	const entry = manifest.countries.find(
		(c) => c.country.toLowerCase() === key.toLowerCase()
	);
	if (!entry) return [];
	const data: Listing[] = await fetch('/' + entry.file).then((r) => r.json());
	cache.set(key, data);
	return data;
}

export async function loadAllCountries(
	onProgress?: (loaded: number, total: number) => void
): Promise<Listing[]> {
	const manifest = await getManifest();
	const all: Listing[] = [];
	let n = 0;
	for (const c of manifest.countries) {
		const chunk = await loadCountry(c.country);
		all.push(...chunk);
		n += 1;
		onProgress?.(n, manifest.countries.length);
	}
	return all;
}

export async function findListingById(id: string | number): Promise<Listing | null> {
	const target = String(id);
	const manifest = await getManifest();
	for (const c of manifest.countries) {
		const chunk = await loadCountry(c.country);
		const found = chunk.find((p) => String(p.id) === target);
		if (found) return found;
	}
	return null;
}

export function listCountryNames(): Promise<string[]> {
	return getManifest().then((m) => m.countries.map((c) => c.country));
}
