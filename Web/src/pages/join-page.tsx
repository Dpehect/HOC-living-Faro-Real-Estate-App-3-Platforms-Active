import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageShell from '@/components/PageShell';

export default function JoinPage() {
	const [sent, setSent] = useState(false);

	return (
		<PageShell
			title="Join HOC Living"
			subtitle="Create an account to save favourites, receive alerts and access exclusive listings across München and Bayern."
		>
			<div className="mx-auto max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
				{sent ? (
					<div className="py-10 text-center">
						<p className="text-xl font-bold text-emerald-800">Welcome aboard</p>
						<p className="mt-2 text-sm text-gray-600">Check your email to confirm your account.</p>
					</div>
				) : (
					<form
						className="space-y-4"
						onSubmit={(e) => {
							e.preventDefault();
							setSent(true);
						}}
					>
						<Input placeholder="Full name" required className="h-11 rounded-xl" />
						<Input type="email" placeholder="Email address" required className="h-11 rounded-xl" />
						<Input type="password" placeholder="Password" required className="h-11 rounded-xl" />
						<Input type="password" placeholder="Confirm password" required className="h-11 rounded-xl" />
						<label className="flex items-start gap-2 text-sm text-gray-600">
							<input type="checkbox" required className="mt-1" />
							<span>I agree to the Terms & Privacy Policy</span>
						</label>
						<Button type="submit" className="h-12 w-full rounded-xl bg-primary text-white hover:bg-accentHover">
							Create account
						</Button>
					</form>
				)}
			</div>
		</PageShell>
	);
}
