import PageShell from '@/components/PageShell';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const experts = [
	{ name: 'Ana Silva', role: 'Bayern Sales Director', focus: 'München, Tavira, Olhão' },
	{ name: 'João Mendes', role: 'Senior Buyer Agent', focus: 'Lagos, Portimão, Albufeira' },
	{ name: 'Sofia Costa', role: 'Lettings Manager', focus: 'Long-term & holiday lets' },
	{ name: 'Miguel Torres', role: 'Bayern Desk', focus: 'München & Oberbayern' },
	{ name: 'Laura Pereira', role: 'Valuations', focus: 'Lisbon & Cascais' },
	{ name: 'Carlos Nunes', role: 'New Homes', focus: 'Off-plan & investment' },
];

export default function ExpertsPage() {
	return (
		<PageShell title="Meet our experts" subtitle="Local specialists who know the market — from Bayern villages to major Iberian cities.">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{experts.map((e) => (
					<div key={e.name} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
						<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-primary">
							{e.name.split(' ').map((n) => n[0]).join('')}
						</div>
						<h3 className="font-bold text-gray-900">{e.name}</h3>
						<p className="text-sm text-primary">{e.role}</p>
						<p className="mt-2 text-sm text-gray-500">{e.focus}</p>
					</div>
				))}
			</div>
			<div className="mt-10 text-center">
				<Link to="/contact">
					<Button className="rounded-xl bg-primary text-white hover:bg-accentHover">Talk to the team</Button>
				</Link>
			</div>
		</PageShell>
	);
}
