import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	MapPin,
	Bed,
	Bath,
	Ruler,
	PawPrint,
	Zap,
	Wallet,
	Maximize2,
} from 'lucide-react';
import { BuildingIcon } from '@/icons/landing-page-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Map from './components/list-page/map/Map';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import posts from './postsData.json';

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
	}),
};

function SinglePage() {
	const { id } = useParams();
	const post = posts.find((e) => String(e.id) === String(id));
	const [date, setDate] = useState<Date>();
	const [activeImage, setActiveImage] = useState(0);
	const [formSent, setFormSent] = useState(false);
	const [isMapExpanded, setIsMapExpanded] = useState(false);

	const images = useMemo(() => post?.images?.filter(Boolean) || [], [post]);
	const detail = post?.postDetail || {};

	useEffect(() => {
		document.body.style.overflow = isMapExpanded ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isMapExpanded]);

	useEffect(() => {
		if (!isMapExpanded) return;
		window.history.pushState({ mapExpanded: true }, '');
		const onPop = () => setIsMapExpanded(false);
		window.addEventListener('popstate', onPop);
		return () => window.removeEventListener('popstate', onPop);
	}, [isMapExpanded]);

	if (!post) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f7f8fb] px-4">
				<h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
				<p className="text-gray-500">This listing may have been removed.</p>
				<Link
					to="/listings"
					className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-accentHover"
				>
					Back to listings
				</Link>
			</div>
		);
	}

	const isRent = post.type === 'rent';
	const priceLabel = isRent
		? `€ ${Number(post.price).toLocaleString()} / month`
		: `€ ${Number(post.price).toLocaleString()}`;

	const nextImage = () => setActiveImage((i) => (i + 1) % Math.max(images.length, 1));
	const prevImage = () =>
		setActiveImage((i) => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));

	return (
		<div className="min-h-screen bg-[#f7f8fb]">
			<SiteNavbar />

			<main className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
				<div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
					<div className="min-w-0 space-y-6">
						{/* Gallery */}
						<motion.div
							className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_-40px_rgba(17,24,39,.5)]"
							initial="hidden"
							animate="visible"
							variants={fadeUp}
							custom={0}
						>
							<div className="relative aspect-[16/10] bg-gray-100">
								<AnimatePresence mode="wait">
									<motion.img
										key={activeImage}
										src={images[activeImage] || images[0]}
										alt={post.title}
										className="h-full w-full object-cover"
										initial={{ opacity: 0.4, scale: 1.02 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.35 }}
									/>
								</AnimatePresence>

								{images.length > 1 && (
									<>
										<button
											type="button"
											onClick={prevImage}
											className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg backdrop-blur transition hover:bg-white"
											aria-label="Previous image"
										>
											<ChevronLeft className="h-5 w-5" />
										</button>
										<button
											type="button"
											onClick={nextImage}
											className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg backdrop-blur transition hover:bg-white"
											aria-label="Next image"
										>
											<ChevronRight className="h-5 w-5" />
										</button>
										<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
											{images.map((_, i) => (
												<button
													key={i}
													type="button"
													onClick={() => setActiveImage(i)}
													className={cn(
														'h-1.5 rounded-full transition-all',
														i === activeImage ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
													)}
												/>
											))}
										</div>
									</>
								)}

								<div className="absolute left-4 top-4 flex flex-wrap gap-2">
									<span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
										{isRent ? 'For rent' : 'For sale'}
									</span>
									{post.property && (
										<span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-gray-800 shadow">
											{post.property}
										</span>
									)}
								</div>
							</div>

							{images.length > 1 && (
								<div className="flex gap-2 overflow-x-auto p-3">
									{images.map((src, i) => (
										<button
											key={i}
											type="button"
											onClick={() => setActiveImage(i)}
											className={cn(
												'h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition',
												i === activeImage
													? 'border-primary'
													: 'border-transparent opacity-70 hover:opacity-100'
											)}
										>
											<img src={src} alt="" className="h-full w-full object-cover" />
										</button>
									))}
								</div>
							)}
						</motion.div>

						<motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
							<h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
								{post.title}
							</h1>
							<p className="mt-2 flex items-center gap-1.5 text-gray-500">
								<MapPin className="h-4 w-4 text-primary" />
								{post.address}
								{post.city ? `, ${post.city}` : ''}
							</p>
							<p className="mt-4 text-3xl font-bold text-primary">{priceLabel}</p>
						</motion.div>

						<motion.div
							className="grid grid-cols-2 gap-3 sm:grid-cols-4"
							initial="hidden"
							animate="visible"
							variants={fadeUp}
							custom={2}
						>
							{[
								{ icon: Bed, label: 'Bedrooms', value: post.bedroom ?? '—' },
								{ icon: Bath, label: 'Bathrooms', value: post.bathroom ?? '—' },
								{ icon: Ruler, label: 'Size', value: detail.size ? `${detail.size} sqft` : '—' },
								{ icon: BuildingIcon, label: 'Type', value: post.property || '—' },
							].map(({ icon: Icon, label, value }) => (
								<div
									key={label}
									className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
								>
									<div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-primary">
										<Icon className="h-4 w-4" />
									</div>
									<p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
									<p className="mt-0.5 text-lg font-bold capitalize text-gray-900">{value}</p>
								</div>
							))}
						</motion.div>

						<motion.section
							className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
							initial="hidden"
							animate="visible"
							variants={fadeUp}
							custom={3}
						>
							<h2 className="text-lg font-bold text-gray-900">About this property</h2>
							<p className="mt-3 leading-relaxed text-gray-600">
								{detail.desc ||
									`Beautiful ${post.property || 'property'} located in ${post.city}. Contact us to schedule a viewing.`}
							</p>
						</motion.section>

						<motion.section
							className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
							initial="hidden"
							animate="visible"
							variants={fadeUp}
							custom={4}
						>
							<h2 className="text-lg font-bold text-gray-900">Policies & details</h2>
							<div className="mt-4 grid gap-4 sm:grid-cols-3">
								{[
									{ icon: Zap, title: 'Utilities', value: detail.utilities || 'Not specified' },
									{ icon: PawPrint, title: 'Pets', value: detail.pet || 'Not specified' },
									{ icon: Wallet, title: 'Income', value: detail.income || 'N/A' },
								].map(({ icon: Icon, title, value }) => (
									<div key={title} className="flex gap-3 rounded-xl bg-gray-50 p-3">
										<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
											<Icon className="h-4 w-4" />
										</div>
										<div>
											<p className="text-sm font-semibold text-gray-900">{title}</p>
											<p className="text-sm text-gray-500">{value}</p>
										</div>
									</div>
								))}
							</div>
						</motion.section>

						{/* Expandable map */}
						<motion.section
							className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
							initial="hidden"
							animate="visible"
							variants={fadeUp}
							custom={5}
						>
							<div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
								<div>
									<h2 className="text-lg font-bold text-gray-900">Location</h2>
									<p className="text-sm text-gray-500">
										{post.address}
										{post.city ? `, ${post.city}` : ''}
									</p>
								</div>
								<button
									type="button"
									onClick={() => setIsMapExpanded(true)}
									className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-accent hover:text-primary"
								>
									<Maximize2 className="h-3.5 w-3.5" />
									Expand map
								</button>
							</div>
							<div className="h-[320px]">
								<Map
									items={isMapExpanded ? posts : [post]}
									expanded={isMapExpanded}
									onExpand={() => setIsMapExpanded(true)}
									onClose={() => setIsMapExpanded(false)}
									showAreaHint={false}
								/>
							</div>
						</motion.section>
					</div>

					{/* Contact card */}
					<motion.aside
						className="xl:sticky xl:top-24 xl:self-start"
						initial="hidden"
						animate="visible"
						variants={fadeUp}
						custom={2}
					>
						<div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_24px_60px_-35px_rgba(5,150,105,.35)]">
							<div className="bg-gradient-to-br from-emerald-600 to-green-600 px-6 py-5 text-white">
								<p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-100">
									{isRent ? 'Monthly rent' : 'Sale price'}
								</p>
								<p className="mt-1 text-3xl font-bold">{priceLabel}</p>
							</div>

							<div className="p-6">
								{formSent ? (
									<div className="rounded-2xl bg-emerald-50 px-4 py-8 text-center">
										<p className="text-lg font-bold text-emerald-800">Request sent!</p>
										<p className="mt-2 text-sm text-emerald-700">
											An agent will contact you shortly.
										</p>
										<button
											type="button"
											onClick={() => setFormSent(false)}
											className="mt-4 text-sm font-semibold text-primary hover:underline"
										>
											Send another request
										</button>
									</div>
								) : (
									<form
										className="space-y-3"
										onSubmit={(e) => {
											e.preventDefault();
											setFormSent(true);
										}}
									>
										<p className="text-sm text-gray-500">
											Fill the form and one of our agents will contact you as soon as possible.
										</p>
										<Input placeholder="Full name" required className="h-11 rounded-xl" />
										<Input type="email" placeholder="Email address" required className="h-11 rounded-xl" />
										<Input type="tel" placeholder="Phone number" className="h-11 rounded-xl" />
										<Popover>
											<PopoverTrigger asChild>
												<Button
													type="button"
													variant="outline"
													className={cn(
														'h-11 w-full justify-start rounded-xl text-left font-normal',
														!date && 'text-muted-foreground'
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{date ? format(date, 'PPP') : 'Preferred tour date'}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
											</PopoverContent>
										</Popover>
										<Button
											type="submit"
											className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-accentHover"
										>
											Request a tour
										</Button>
									</form>
								)}

								<div className="mt-6 border-t border-gray-100 pt-5 text-center text-xs text-gray-400">
									Listing #{post.id} · HOC Living Faro
								</div>
							</div>
						</div>
					</motion.aside>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}

export default SinglePage;
