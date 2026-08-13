import { Link } from 'react-router-dom';
import { BuildingIcon } from '@/icons/landing-page-icons';

export default function SiteFooter() {
	return (
		<footer className="mt-auto border-t border-gray-200 bg-gray-900 text-gray-300">
			<div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-10 xl:px-16">
				<div className="col-span-2 md:col-span-1">
					<div className="mb-4 flex items-center gap-2">
						<BuildingIcon className="h-7 w-7 text-accent" />
						<span className="text-sm font-bold uppercase tracking-wider text-white">
							HOC Living
						</span>
					</div>
					<p className="text-sm leading-relaxed text-gray-400">
						Premium real estate across Europe. Homes, apartments and investment
						opportunities in Europe and beyond.
					</p>
				</div>

				<div>
					<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
						Sales & Lettings
					</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link to="/sell" className="transition hover:text-accent">
								Sell a property
							</Link>
						</li>
						<li>
							<Link to="/listings" className="transition hover:text-accent">
								Buy a property
							</Link>
						</li>
						<li>
							<Link to="/sell" className="transition hover:text-accent">
								Let a property
							</Link>
						</li>
						<li>
							<Link to="/listings" className="transition hover:text-accent">
								Rent a property
							</Link>
						</li>
						<li>
							<Link to="/listings" className="transition hover:text-accent">
								Property search
							</Link>
						</li>
						<li>
							<Link to="/home-value" className="transition hover:text-accent">
								Home value
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
						Help & Contact
					</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link to="/contact" className="transition hover:text-accent">
								Contact us
							</Link>
						</li>
						<li>
							<Link to="/join" className="transition hover:text-accent">
								Login / Join
							</Link>
						</li>
						<li>
							<Link to="/terms" className="transition hover:text-accent">
								Terms & conditions
							</Link>
						</li>
						<li>
							<Link to="/faq" className="transition hover:text-accent">
								FAQs
							</Link>
						</li>
						<li>
							<Link to="/privacy" className="transition hover:text-accent">
								Privacy
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
						Useful links
					</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link to="/experts" className="transition hover:text-accent">
								Meet our experts
							</Link>
						</li>
						<li>
							<Link to="/blog" className="transition hover:text-accent">
								Blog
							</Link>
						</li>
						<li>
							<Link to="/sitemap" className="transition hover:text-accent">
								Sitemap
							</Link>
						</li>
						<li>
							<Link to="/franchise" className="transition hover:text-accent">
								Franchise
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-gray-800 px-4 py-4 text-center text-xs text-gray-500">
				© {new Date().getFullYear()} HOC Living Real Estate. All rights reserved.
			</div>
		</footer>
	);
}
