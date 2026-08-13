import { useState } from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageShell from '@/components/PageShell';

export default function ContactPage() {
	const [sent, setSent] = useState(false);

	return (
		<PageShell
			title="Contact us"
			subtitle="Our Faro team is ready to help with buying, renting or listing your property across Portugal and Spain."
		>
			<div className="grid gap-8 lg:grid-cols-[1fr_340px]">
				<div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
					{sent ? (
						<div className="rounded-2xl bg-emerald-50 px-6 py-12 text-center">
							<p className="text-xl font-bold text-emerald-800">Message sent</p>
							<p className="mt-2 text-sm text-emerald-700">We will get back to you within one business day.</p>
							<button type="button" onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-primary hover:underline">
								Send another message
							</button>
						</div>
					) : (
						<form
							className="space-y-4"
							onSubmit={(e) => {
								e.preventDefault();
								setSent(true);
							}}
						>
							<div className="grid gap-4 sm:grid-cols-2">
								<Input placeholder="Full name" required className="h-11 rounded-xl" />
								<Input type="email" placeholder="Email" required className="h-11 rounded-xl" />
							</div>
							<Input type="tel" placeholder="Phone (optional)" className="h-11 rounded-xl" />
							<select className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" defaultValue="">
								<option value="" disabled>
									How can we help?
								</option>
								<option>Buying a property</option>
								<option>Renting a property</option>
								<option>Selling / listing</option>
								<option>Home valuation</option>
								<option>Franchise enquiry</option>
								<option>Other</option>
							</select>
							<textarea
								required
								placeholder="Your message"
								rows={5}
								className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
							/>
							<Button type="submit" className="h-12 w-full rounded-xl bg-primary text-white hover:bg-accentHover sm:w-auto sm:px-8">
								Send message
							</Button>
						</form>
					)}
				</div>

				<div className="space-y-4">
					{[
						{ icon: MapPin, label: 'Office', value: 'Rua de Santo António 12\n8000-285 Faro, Portugal' },
						{ icon: Phone, label: 'Phone', value: '+351 289 000 000' },
						{ icon: Mail, label: 'Email', value: 'hello@hoclivingfaro.com' },
						{ icon: Clock, label: 'Hours', value: 'Mon–Fri 09:00–18:00\nSat 10:00–14:00' },
					].map(({ icon: Icon, label, value }) => (
						<div key={label} className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
							<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-primary">
								<Icon className="h-4 w-4" />
							</div>
							<div>
								<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
								<p className="mt-0.5 whitespace-pre-line text-sm font-medium text-gray-800">{value}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</PageShell>
	);
}
