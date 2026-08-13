import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageShell from '@/components/PageShell';

const benefits = [
	{ title: 'Proven brand', text: 'Operate under the HOC Living Faro name with marketing support across Portugal and Spain.' },
	{ title: 'Training & tools', text: 'CRM, listing platform and continuous training for your local team.' },
	{ title: 'Territory protection', text: 'Exclusive catchment areas so you can grow with confidence.' },
	{ title: 'Lead network', text: 'Shared buyer and seller leads from our national digital campaigns.' },
];

export default function FranchisePage() {
	const [sent, setSent] = useState(false);

	return (
		<PageShell
			title="Franchise with us"
			subtitle="Bring HOC Living Faro to your city. We partner with ambitious agents who share our standards."
		>
			<div className="grid gap-4 sm:grid-cols-2">
				{benefits.map((b) => (
					<div key={b.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
						<h3 className="font-bold text-gray-900">{b.title}</h3>
						<p className="mt-2 text-sm text-gray-600">{b.text}</p>
					</div>
				))}
			</div>

			<div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
				<h2 className="text-xl font-bold text-gray-900">Franchise enquiry</h2>
				{sent ? (
					<p className="mt-4 text-emerald-700">Thanks — our partnerships team will contact you shortly.</p>
				) : (
					<form
						className="mt-4 grid gap-4 sm:grid-cols-2"
						onSubmit={(e) => {
							e.preventDefault();
							setSent(true);
						}}
					>
						<Input placeholder="Full name" required className="h-11 rounded-xl" />
						<Input type="email" placeholder="Email" required className="h-11 rounded-xl" />
						<Input placeholder="City / region of interest" required className="h-11 rounded-xl sm:col-span-2" />
						<textarea placeholder="Tell us about your experience" rows={4} className="rounded-xl border border-input bg-background px-3 py-2 text-sm sm:col-span-2" />
						<Button type="submit" className="h-12 rounded-xl bg-primary text-white hover:bg-accentHover sm:col-span-2 sm:w-auto sm:px-8">
							Submit enquiry
						</Button>
					</form>
				)}
			</div>
		</PageShell>
	);
}
