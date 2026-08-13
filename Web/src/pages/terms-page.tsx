import PageShell from '@/components/PageShell';

export default function TermsPage() {
	return (
		<PageShell title="Terms & conditions" subtitle="Please read these terms carefully before using HOC Living services.">
			<article className="prose prose-gray max-w-none space-y-6 rounded-3xl border border-gray-200 bg-white p-6 text-sm leading-relaxed text-gray-600 shadow-sm md:p-8">
				<section>
					<h2 className="text-lg font-bold text-gray-900">1. About us</h2>
					<p className="mt-2">HOC Living Real Estate provides online property search and related agency services in Europe. By using this website you agree to these terms.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">2. Listings information</h2>
					<p className="mt-2">Property details, prices and availability are provided in good faith but may change without notice. Always confirm key facts with an agent before making decisions.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">3. User accounts</h2>
					<p className="mt-2">You are responsible for keeping login credentials secure. Provide accurate information when registering or submitting enquiries.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">4. Agency services</h2>
					<p className="mt-2">Viewings, valuations and transactions may be subject to separate written agreements and local regulations. Commission and fees will be disclosed before you proceed.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">5. Limitation of liability</h2>
					<p className="mt-2">We strive for accuracy but do not accept liability for indirect losses arising from use of the site or reliance on published data, except where required by law.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">6. Contact</h2>
					<p className="mt-2">For questions about these terms, email hello@hocliving.com or write to our European offices.</p>
				</section>
			</article>
		</PageShell>
	);
}
