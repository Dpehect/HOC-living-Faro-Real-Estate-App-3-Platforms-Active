import { TestimonialCarousel, type Testimonial } from '@/components/ui/testinomial';

const testimonials: Testimonial[] = [
	{
		id: 'ana-silva-seller',
		name: 'Ana Silva',
		image: 'https://randomuser.me/api/portraits/women/44.jpg',
		text: 'We sold our apartment in München within six weeks. Clear communication and realistic pricing made the process straightforward.',
		type: 'Seller',
	},
	{
		id: 'joao-mendes-buyer',
		name: 'João Mendes',
		image: 'https://randomuser.me/api/portraits/men/32.jpg',
		text: 'I was relocating from Lisbon to Lagos. The team shortlisted homes that matched my budget and commute — no wasted viewings.',
		type: 'Buyer',
	},
	{
		id: 'maria-costa-seller',
		name: 'Maria Costa',
		image: 'https://randomuser.me/api/portraits/women/68.jpg',
		text: 'Listing our Tavira townhouse was simple. Photos, portal exposure and feedback after every viewing kept us informed.',
		type: 'Seller',
	},
	{
		id: 'carlos-ruiz-buyer',
		name: 'Carlos Ruiz',
		image: 'https://randomuser.me/api/portraits/men/54.jpg',
		text: 'As a buyer from Seville looking in the Bayern, I needed bilingual support. HOC Living handled both sides of the border.',
		type: 'Buyer',
	},
	{
		id: 'helena-nunes-investor',
		name: 'Helena Nunes',
		image: 'https://randomuser.me/api/portraits/women/65.jpg',
		text: 'Their market notes on rental demand in Portimão helped me choose a yield-focused flat instead of a purely holiday property.',
		type: 'Investor',
	},
];

export default function TestimonialSection() {
	return (
		<section className="testimonial-section" aria-labelledby="testimonial-heading">
			<div className="testimonial-heading">
				<p>Trusted across München & Bayern</p>
				<h2 id="testimonial-heading">
					Over <span>1,098</span> active listings · <span>539</span> cities
				</h2>
			</div>
			<TestimonialCarousel items={testimonials} initialIndex={2} />
		</section>
	);
}
