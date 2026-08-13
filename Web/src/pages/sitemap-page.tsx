import { Link } from 'react-router-dom';
import PageShell from '@/components/PageShell';

const groups = [
	{
		title: 'Main',
		links: [
			{ to: '/', label: 'Home' },
			{ to: '/listings', label: 'Property search' },
			{ to: '/sell', label: 'Sell or list' },
			{ to: '/home-value', label: 'Home value' },
			{ to: '/franchise', label: 'Franchise' },
		],
	},
	{
		title: 'Company',
		links: [
			{ to: '/contact', label: 'Contact us' },
			{ to: '/join', label: 'Join' },
			{ to: '/experts', label: 'Meet our experts' },
			{ to: '/blog', label: 'Blog' },
		],
	},
	{
		title: 'Legal & help',
		links: [
			{ to: '/faq', label: 'FAQs' },
			{ to: '/terms', label: 'Terms & conditions' },
			{ to: '/privacy', label: 'Privacy policy' },
			{ to: '/sitemap', label: 'Sitemap' },
		],
	},
];

export default function SitemapPage() {
	return (
		<PageShell title="Sitemap" subtitle="Find every section of HOC Living in one place.">
			<div className="grid gap-6 sm:grid-cols-3">
				{groups.map((g) => (
					<div key={g.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
						<h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">{g.title}</h2>
						<ul className="mt-3 space-y-2">
							{g.links.map((l) => (
								<li key={l.to}>
									<Link to={l.to} className="text-sm font-medium text-gray-800 hover:text-primary">
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</PageShell>
	);
}
