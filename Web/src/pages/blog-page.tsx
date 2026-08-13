import { Link } from 'react-router-dom';
import PageShell from '@/components/PageShell';

const posts = [
	{ slug: 'muenchen-market-2026', title: 'European property market outlook 2026', date: '12 Mar 2026', excerpt: 'Demand remains strong across major European capitals as cross-border buyers return.' },
	{ slug: 'buying-guide-bayern', title: 'First-time buyer guide: Europe', date: '28 Feb 2026', excerpt: 'From financing to notary day — the steps every cross-border buyer should know.' },
	{ slug: 'rental-yields-muenchen', title: 'Rental yields across Northern Europe', date: '10 Feb 2026', excerpt: 'Where long-term lets perform best in Germany, Nordics and France.' },
	{ slug: 'energy-certificates', title: 'Energy certificates explained', date: '22 Jan 2026', excerpt: 'What energy certificates mean for sale and rent listings across the EU.' },
];

export default function BlogPage() {
	return (
		<PageShell title="Blog" subtitle="Market insights, buying guides and local tips from the HOC Living team.">
			<div className="grid gap-4 md:grid-cols-2">
				{posts.map((p) => (
					<article key={p.slug} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
						<p className="text-xs font-semibold uppercase tracking-wide text-primary">{p.date}</p>
						<h2 className="mt-2 text-lg font-bold text-gray-900">{p.title}</h2>
						<p className="mt-2 text-sm text-gray-600">{p.excerpt}</p>
						<span className="mt-4 inline-block text-sm font-semibold text-primary">Read more →</span>
					</article>
				))}
			</div>
			<p className="mt-8 text-center text-sm text-gray-400">
				Looking for a home?{' '}
				<Link to="/listings" className="font-semibold text-primary hover:underline">
					Browse listings
				</Link>
			</p>
		</PageShell>
	);
}
