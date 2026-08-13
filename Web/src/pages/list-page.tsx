import postsData from './postsData.json';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Card from './components/list-page/Card';
import { Filter, type ListingFilters } from './components/list-page/filter-section';
import Map from './components/list-page/map/Map';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';

const defaultFilters: ListingFilters = {
	query: '',
	type: '',
	property: '',
	minPrice: '',
	maxPrice: '',
	bedrooms: '',
	radius: '5',
};

const PAGE_SIZE = 24;

const containerVariants = {
	hidden: { opacity: 1 },
	visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, y: 0 },
};

function distanceInKm(a, b) {
	const toRadians = (value) => (value * Math.PI) / 180;
	const latDistance = toRadians(Number(b.latitude) - Number(a.latitude));
	const lonDistance = toRadians(Number(b.longitude) - Number(a.longitude));
	const firstLat = toRadians(Number(a.latitude));
	const secondLat = toRadians(Number(b.latitude));
	const calculation =
		Math.sin(latDistance / 2) ** 2 +
		Math.cos(firstLat) * Math.cos(secondLat) * Math.sin(lonDistance / 2) ** 2;
	return 6371 * 2 * Math.atan2(Math.sqrt(calculation), Math.sqrt(1 - calculation));
}

function ListPage() {
	const [isMapExpanded, setIsMapExpanded] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [filters, setFilters] = useState<ListingFilters>(defaultFilters);
	const [page, setPage] = useState(1);
	const links = ['Buy or Rent', 'Sell or List', 'Home Value', 'Franchise'];

	useEffect(() => {
		document.body.style.overflow = isMapExpanded ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isMapExpanded]);

	useEffect(() => {
		if (!isMapExpanded) return;
		window.history.pushState({ mapExpanded: true }, '');
		const handlePopState = () => {
			setIsMapExpanded(false);
			setSelectedLocation(null);
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, [isMapExpanded]);

	const filteredPosts = useMemo(() => {
		return postsData.filter((post) => {
			const searchable = `${post.title} ${post.address} ${post.city}`.toLowerCase();
			const q = filters.query.toLowerCase().trim();
			if (q && !searchable.includes(q)) return false;
			if (filters.type && post.type !== filters.type) return false;
			if (filters.property && post.property !== filters.property) return false;
			if (filters.minPrice && post.price < Number(filters.minPrice)) return false;
			if (filters.maxPrice && post.price > Number(filters.maxPrice)) return false;
			if (filters.bedrooms && Number(post.bedroom || 0) < Number(filters.bedrooms)) return false;
			if (selectedLocation) {
				const dist = distanceInKm(selectedLocation, post);
				if (dist > Number(filters.radius || 5)) return false;
			}
			return true;
		});
	}, [filters, selectedLocation]);

	useEffect(() => {
		setPage(1);
	}, [filters, selectedLocation]);

	const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
	const pageItems = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	const resetFilters = () => {
		setFilters(defaultFilters);
		setSelectedLocation(null);
		setPage(1);
	};

	const handleCloseMap = () => setIsMapExpanded(false);

	const handleFilterChange = (next: ListingFilters) => {
		const queryChanged = next.query !== filters.query;
		setFilters(next);
		if (queryChanged && next.query.trim()) setSelectedLocation(null);
	};

	return (
		<div className="min-h-screen bg-[#f7f8fb]">
			<SiteNavbar />

			<main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 md:px-10 xl:grid-cols-[minmax(0,1fr)_430px] xl:px-16">
				<div className="min-w-0">
					<div className="block">
						<Filter
							filters={filters}
							onChange={handleFilterChange}
							onReset={resetFilters}
							resultCount={filteredPosts.length}
							hasMapLocation={Boolean(selectedLocation)}
						/>
					</div>

					<Suspense fallback={<p className="p-8 text-gray-500">Loading properties…</p>}>
						{filteredPosts.length ? (
							<>
								<motion.div
									key={JSON.stringify(filters) + Boolean(selectedLocation) + page}
									initial="hidden"
									animate="visible"
									variants={containerVariants}
									className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
								>
									{pageItems.map((post) => (
										<motion.div key={post.id} variants={cardVariants}>
											<Card item={post} />
										</motion.div>
									))}
								</motion.div>

								{totalPages > 1 && (
									<div className="mt-8 flex flex-wrap items-center justify-center gap-2">
										<button
											type="button"
											disabled={page <= 1}
											onClick={() => setPage((p) => Math.max(1, p - 1))}
											className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold disabled:opacity-40"
										>
											Previous
										</button>
										<span className="px-3 text-sm text-gray-600">
											Page {page} / {totalPages}
										</span>
										<button
											type="button"
											disabled={page >= totalPages}
											onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
											className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold disabled:opacity-40"
										>
											Next
										</button>
									</div>
								)}
							</>
						) : (
							<div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
								<h2 className="text-lg font-bold text-gray-900">No properties match these filters</h2>
								<p className="mt-2 text-sm text-gray-500">
									Try a larger map radius, search a city name, or clear filters.
								</p>
								<button
									type="button"
									onClick={resetFilters}
									className="mt-5 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
								>
									Reset search
								</button>
							</div>
						)}
					</Suspense>
				</div>

				<div className="h-[620px] xl:sticky xl:top-6">
					<Suspense fallback={<p>Loading map…</p>}>
						<Map
							items={postsData}
							expanded={isMapExpanded}
							onExpand={() => setIsMapExpanded(true)}
							onClose={handleCloseMap}
							selectedLocation={selectedLocation}
							onLocationSelect={setSelectedLocation}
							radiusKm={Number(filters.radius) || 5}
						/>
					</Suspense>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}

export default ListPage;
