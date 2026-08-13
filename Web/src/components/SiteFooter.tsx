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
							HOC Living Faro
						</span>
					</div>
					<p className="text-sm leading-relaxed text-gray-400">
						Premium real estate across Portugal & Spain. Homes, apartments and investment
						opportunities in Faro, Algarve and beyond.
					</p>
				</div>

				<div>
					<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
						Sales & Lettings
					</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<Link to="/listings" className="hover:text-accent">
								Buy a property
							</Link>
						</li>
						<li>
							<Link to="/listings" className="hover:text-accent">
								Rent a property
							</Link>
						</li>
						<li>
							<Link to="/listings" className="hover:text-accent">
								Sell a property
							</Link>
						</li>
						<li>
							<Link to="/listings" className="hover:text-accent">
								Property search
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
						Help & Contact
					</h3>
					<ul className="space-y-2 text-sm">
						<li className="hover:text-accent">Contact us</li>
						<li className="hover:text-accent">FAQs</li>
						<li className="hover:text-accent">Terms & conditions</li>
						<li className="hover:text-accent">Privacy</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
						Useful links
					</h3>
					<ul className="space-y-2 text-sm">
						<li className="hover:text-accent">Meet our experts</li>
						<li className="hover:text-accent">Blog</li>
						<li className="hover:text-accent">Franchise</li>
						<li className="hover:text-accent">Sitemap</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-gray-800 px-4 py-4 text-center text-xs text-gray-500">
				© {new Date().getFullYear()} HOC Living Faro Real Estate. All rights reserved.
			</div>
		</footer>
	);
}
