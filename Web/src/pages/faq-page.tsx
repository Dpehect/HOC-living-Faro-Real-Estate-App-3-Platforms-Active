import PageShell from '@/components/PageShell';

const faqs = [
	{ q: 'Which areas do you cover?', a: 'We list properties across Europe, with a strong focus on the Bayern, Lisbon, Porto and major Spanish cities such as Madrid, Barcelona, Seville and Málaga.' },
	{ q: 'How do I schedule a viewing?', a: 'Open any listing and use the “Request a tour” form, or contact us directly. An agent will confirm a time that works for you.' },
	{ q: 'Are your valuations free?', a: 'Yes. Online estimates are free and without obligation. In-person valuations for sellers are also free under a listing agreement.' },
	{ q: 'What documents do I need to rent?', a: 'Typically proof of identity, income and employment. Some landlords may request a guarantor or deposit equivalent to one or two months’ rent.' },
	{ q: 'Can foreign buyers purchase property?', a: 'Yes. Non-residents can buy in Europe. We coordinate with trusted legal partners for due diligence and contracts.' },
	{ q: 'How long does a sale usually take?', a: 'From accepted offer to completion, sales often take 6–12 weeks depending on financing, surveys and local notary timelines.' },
	{ q: 'Do you charge tenants agency fees?', a: 'Fee structures vary by listing. Any applicable fees are disclosed before you commit to a viewing or application.' },
	{ q: 'How do I list my property?', a: 'Visit Sell or List, submit the form, and we will arrange a valuation and marketing plan.' },
];

export default function FaqPage() {
	return (
		<PageShell title="FAQs" subtitle="Answers to common questions about buying, renting and listing with HOC Living.">
			<div className="space-y-3">
				{faqs.map((f) => (
					<details key={f.q} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm open:shadow-md">
						<summary className="cursor-pointer list-none font-semibold text-gray-900 marker:content-none">
							<span className="flex items-center justify-between gap-4">
								{f.q}
								<span className="text-primary transition group-open:rotate-45">+</span>
							</span>
						</summary>
						<p className="mt-3 text-sm leading-relaxed text-gray-600">{f.a}</p>
					</details>
				))}
			</div>
		</PageShell>
	);
}
