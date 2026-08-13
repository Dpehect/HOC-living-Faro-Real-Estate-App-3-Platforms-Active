import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageShell from '@/components/PageShell';

export default function SellPage() {
	const [sent, setSent] = useState(false);

	return (
		<PageShell
			title="Sell or list your property"
			subtitle="List with HOC Living Faro and reach serious buyers and tenants across Portugal and Spain."
		>
			<div className="mb-8 grid gap-4 sm:grid-cols-3">
				{[
					{ t: 'Professional photos', d: 'We arrange quality visuals that highlight your home.' },
					{ t: 'Wide exposure', d: 'Your listing appears on our site and partner portals.' },
					{ t: 'Dedicated agent', d: 'One specialist guides you from valuation to completion.' },
				].map((x) => (
					<div key={x.t} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
						<h3 className="font-bold text-gray-900">{x.t}</h3>
						<p className="mt-2 text-sm text-gray-600">{x.d}</p>
					</div>
				))}
			</div>

			<div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
				<h2 className="text-xl font-bold text-gray-900">Request a listing consultation</h2>
				{sent ? (
					<p className="mt-4 text-emerald-700">Thank you. An agent will contact you to arrange a visit.</p>
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
						<Input placeholder="Property city" required className="h-11 rounded-xl" />
						<select className="h-11 rounded-xl border border-input bg-background px-3 text-sm" defaultValue="sale">
							<option value="sale">I want to sell</option>
							<option value="let">I want to let</option>
						</select>
						<textarea placeholder="Brief description of the property" rows={4} className="rounded-xl border border-input bg-background px-3 py-2 text-sm sm:col-span-2" />
						<Button type="submit" className="h-12 rounded-xl bg-primary text-white hover:bg-accentHover sm:col-span-2 sm:w-auto sm:px-8">
							Request consultation
						</Button>
					</form>
				)}
			</div>
		</PageShell>
	);
}
