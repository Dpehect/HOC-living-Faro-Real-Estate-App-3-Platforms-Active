import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, HamburgerIcon } from '@/icons/landing-page-icons';
import { Button } from '@/components/ui/button';

const links = [
	{ text: 'Buy or Rent', href: '/listings' },
	{ text: 'Sell or List', href: '/sell' },
	{ text: 'Home Value', href: '/home-value' },
	{ text: 'Franchise', href: '/franchise' },
];

export default function SiteNavbar() {
	const [isNavOpen, setIsNavOpen] = useState(false);

	return (
		<nav className="relative z-50 border-b border-gray-200 bg-white px-4 py-4 md:px-10 xl:px-16">
			<div className="mx-auto flex max-w-[1600px] items-center justify-between">
				<Link to="/" className="flex items-center" onClick={() => setIsNavOpen(false)}>
					<BuildingIcon className="h-8 w-8 text-primary" />
					<span className="ml-3 text-lg font-bold uppercase tracking-wider text-gray-900">
						HOC Living
					</span>
					<span className="ml-2 hidden text-xs uppercase tracking-widest text-gray-400 sm:inline">
						Real Estate
					</span>
				</Link>

				<div className="flex items-center gap-4 md:hidden">
					<button onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Toggle navigation">
						<HamburgerIcon className="h-6 w-6 text-gray-800" />
					</button>
				</div>

				<div
					className={`${
						isNavOpen ? 'flex' : 'hidden'
					} absolute left-0 top-16 w-full flex-col gap-3 bg-white p-4 shadow-md md:static md:flex md:w-auto md:flex-row md:gap-6 md:p-0 md:shadow-none`}
				>
					{links.map(({ text, href }) => (
						<Link
							to={href}
							className="text-sm text-gray-600 transition hover:text-primary"
							key={text}
							onClick={() => setIsNavOpen(false)}
						>
							{text}
						</Link>
					))}
					<Link
						to="/contact"
						className="text-sm text-gray-600 transition hover:text-primary md:hidden"
						onClick={() => setIsNavOpen(false)}
					>
						Contact us
					</Link>
					<Link
						to="/join"
						className="text-sm font-semibold text-primary md:hidden"
						onClick={() => setIsNavOpen(false)}
					>
						Join
					</Link>
				</div>

				<div className="hidden gap-2 md:flex">
					<Button variant="outline" asChild>
						<Link to="/contact">Contact us</Link>
					</Button>
					<Button className="bg-accent text-white hover:bg-accentHover" asChild>
						<Link to="/join">Join</Link>
					</Button>
				</div>
			</div>
		</nav>
	);
}
