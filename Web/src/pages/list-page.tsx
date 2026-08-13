import postsData from './postsData.json';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Card from './components/list-page/Card';
import { Filter, type ListingFilters } from './components/list-page/filter-section';
import Map from './components/list-page/map/Map';
import { BuildingIcon, HamburgerIcon, FilterIcon } from '@/icons/landing-page-icons';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const defaultFilters: ListingFilters = {
	query: '',
	type: '',
	property: '',
	minPrice: '',
	maxPrice: '',
	bedrooms: '',
	radius: '5',
};

const containerVariants = {
	hidden: { opacity: 1 },
	visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 16 },
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
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isMapExpanded, setIsMapExpanded] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [filters, setFilters] = useState<ListingFilters>(defaultFilters);
	const links = ['Buy or Rent', 'Sell or List', 'Home Value', 'Franchise'];

	// Prevent body scroll when map is expanded
	useEffect(() => {
		document.body.style.overflow = isMapExpanded ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isMapExpanded]);

	// Browser Back button closes the expanded map instead of leaving the page
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
			if (filters.query && !searchable.includes(filters.query.toLowerCase().trim())) return false;
			if (filters.type && post.type !== filters.type) return false;
			if (filters.property && post.property !== filters.property) return false;
			if (filters.minPrice && post.price < Number(filters.minPrice)) return false;
			if (filters.maxPrice && post.price > Number(filters.maxPrice)) return false;
			if (filters.bedrooms && Number(post.bedroom || 0) < Number(filters.bedrooms)) return false;
			if (selectedLocation && distanceInKm(selectedLocation, post) > Number(filters.radius)) return false;
			return true;
		});
	}, [filters, selectedLocation]);

	const resetFilters = () => {
		setFilters(defaultFilters);
		setSelectedLocation(null);
	};

	const handleCloseMap = () => {
		setIsMapExpanded(false);
		setSelectedLocation(null);
	};

	return (
		<div className="min-h-screen bg-[#f7f8fb]">
			<nav className="relative z-50 border-b border-gray-200 bg-white px-4 py-4 md:px-10 xl:px-16">
				<div className="mx-auto flex max-w-[1600px] items-center justify-between">
					<Link to="/" className="flex items-center">
						<BuildingIcon className="h-8 w-8 text-primary" />
						<span className="ml-3 text-lg font-bold uppercase tracking-wider text-gray-900">
							HOC Living Faro
						</span>
						<span className="ml-2 hidden text-xs uppercase tracking-widest text-gray-400 sm:inline">
							Real Estate
						</span>
					</Link>

					<div className="flex items-center gap-4 md:hidden">
						<button onClick={() => setIsFilterOpen(!isFilterOpen)} aria-label="Toggle filters">
							<FilterIcon className="h-6 w-6 text-gray-800" />
						</button>
						<button onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Toggle navigation">
							<HamburgerIcon className="h-6 w-6 text-gray-800" />
						</button>
					</div>

					<div
						className={`${
							isNavOpen ? 'flex' : 'hidden'
						} absolute left-0 top-16 w-full flex-col gap-3 bg-white p-4 shadow-md md:static md:flex md:w-auto md:flex-row md:gap-6 md:p-0 md:shadow-none`}
					>
						{links.map((text) => (
							<Link
								to="/listings"
								className="text-sm text-gray-600 transition hover:text-gray-950"
								key={text}
							>
								{text}
							</Link>
						))}
					</div>

					<div className="hidden gap-2 md:flex">
						<Button variant="outline">Contact us</Button>
						<Button className="bg-accent text-white hover:bg-accentHover">Join</Button>
					</div>
				</div>
			</nav>

			<main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 md:px-10 xl:grid-cols-[minmax(0,1fr)_430px] xl:px-16">
				<div className="min-w-0">
					<div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
						<Filter
							filters={filters}
							onChange={setFilters}
							onReset={resetFilters}
							resultCount={filteredPosts.length}
							hasMapLocation={Boolean(selectedLocation)}
						/>
					</div>

					<Suspense fallback={<p className="p-8 text-gray-500">Loading properties…</p>}>
						{filteredPosts.length ? (
							<motion.div
								key={JSON.stringify(filters) + Boolean(selectedLocation)}
								initial="hidden"
								animate="visible"
								variants={containerVariants}
								className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
							>
								{filteredPosts.map((post) => (
									<motion.div key={post.id} variants={cardVariants}>
										<Card item={post} />
									</motion.div>
								))}
							</motion.div>
						) : (
							<div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
								<h2 className="text-lg font-bold text-gray-900">No properties match these filters</h2>
								<p className="mt-2 text-sm text-gray-500">
									Try a larger map radius or clear some filters.
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
							items={filteredPosts}
							expanded={isMapExpanded}
							onExpand={() => setIsMapExpanded(true)}
							onClose={handleCloseMap}
							selectedLocation={selectedLocation}
							onLocationSelect={setSelectedLocation}
						/>
					</Suspense>
				</div>
			</main>
		</div>
	);
}

export default ListPage;
