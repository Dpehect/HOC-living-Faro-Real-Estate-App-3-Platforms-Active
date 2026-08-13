import PageShell from '@/components/PageShell';

export default function PrivacyPage() {
	return (
		<PageShell title="Privacy policy" subtitle="How we collect, use and protect your personal data.">
			<article className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 text-sm leading-relaxed text-gray-600 shadow-sm md:p-8">
				<section>
					<h2 className="text-lg font-bold text-gray-900">Data we collect</h2>
					<p className="mt-2">Contact details you submit via forms, account information, and basic usage data (pages viewed, device type) to improve the service.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">How we use data</h2>
					<p className="mt-2">To respond to enquiries, arrange viewings, send listing alerts you request, and meet legal obligations related to property transactions.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">Sharing</h2>
					<p className="mt-2">We may share relevant details with assigned agents, trusted legal partners, or service providers under confidentiality agreements. We do not sell your data.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">Your rights</h2>
					<p className="mt-2">Under GDPR you may request access, correction or deletion of your personal data. Contact privacy@hoclivingfaro.com.</p>
				</section>
				<section>
					<h2 className="text-lg font-bold text-gray-900">Cookies</h2>
					<p className="mt-2">We use essential cookies for site function and optional analytics cookies. You can control non-essential cookies via your browser settings.</p>
				</section>
			</article>
		</PageShell>
	);
}
