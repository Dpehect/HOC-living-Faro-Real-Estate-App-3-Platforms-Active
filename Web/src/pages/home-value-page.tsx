import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageShell from '@/components/PageShell';

export default function HomeValuePage() {
	const [result, setResult] = useState<string | null>(null);

	return (
		<PageShell
			title="Home value"
			subtitle="Get a free indicative valuation of your property in Portugal or Spain. An agent will refine the estimate after a visit."
		>
			<div className="mx-auto max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
				{result ? (
					<div className="text-center">
						<p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Indicative range</p>
						<p className="mt-2 text-3xl font-bold text-primary">{result}</p>
						<p className="mt-3 text-sm text-gray-500">This is an automated estimate. Book a free visit for a precise valuation.</p>
						<Button className="mt-6 rounded-xl bg-primary text-white hover:bg-accentHover" onClick={() => setResult(null)}>
							New estimate
						</Button>
					</div>
				) : (
					<form
						className="space-y-4"
						onSubmit={(e) => {
							e.preventDefault();
							const base = 180000 + Math.floor(Math.random() * 420000);
							setResult(`€ ${base.toLocaleString()} – € ${(base + 45000).toLocaleString()}`);
						}}
					>
						<Input placeholder="Property address / city" required className="h-11 rounded-xl" />
						<select className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm" required defaultValue="">
							<option value="" disabled>
								Property type
							</option>
							<option>Apartment</option>
							<option>House</option>
							<option>Condo</option>
							<option>Land</option>
						</select>
						<div className="grid grid-cols-2 gap-4">
							<Input type="number" placeholder="Bedrooms" min={0} className="h-11 rounded-xl" />
							<Input type="number" placeholder="Size (sqft)" min={0} className="h-11 rounded-xl" />
						</div>
						<Input type="email" placeholder="Your email for the report" required className="h-11 rounded-xl" />
						<Button type="submit" className="h-12 w-full rounded-xl bg-primary text-white hover:bg-accentHover">
							Get free valuation
						</Button>
					</form>
				)}
			</div>
		</PageShell>
	);
}
