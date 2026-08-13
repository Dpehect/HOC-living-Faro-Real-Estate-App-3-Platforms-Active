import { TestimonialCarousel, type Testimonial } from '@/components/ui/testinomial';

const testimonials: Testimonial[] = [
	{ id: 'john-doe-seller', name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Tru made selling my house a breeze. Their expert guidance and personal service were outstanding.', type: 'Seller' },
	{ id: 'jane-smith-buyer', name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'The team understood exactly what I needed and helped me find the right home faster than I expected.', type: 'Buyer' },
	{ id: 'samuel-green-seller', name: 'Samuel Green', image: 'https://randomuser.me/api/portraits/men/54.jpg', text: 'The team at Tru provided excellent service and support throughout the entire selling process.', type: 'Seller' },
	{ id: 'olivia-brooks-buyer', name: 'Olivia Brooks', image: 'https://randomuser.me/api/portraits/women/68.jpg', text: 'Every viewing was relevant, communication was clear, and the final negotiation felt completely effortless.', type: 'Buyer' },
	{ id: 'daniel-lee-investor', name: 'Daniel Lee', image: 'https://randomuser.me/api/portraits/men/75.jpg', text: 'Their local market insight gave me the confidence to make a smart property investment in Faro.', type: 'Investor' },
];

export default function TestimonialSection() {
	return (
		<section className="testimonial-section" aria-labelledby="testimonial-heading">
			<div className="testimonial-heading">
				<p>Trusted by homeowners</p>
				<h2 id="testimonial-heading">Over <span>1000+</span> happy customers</h2>
			</div>
			<TestimonialCarousel items={testimonials} initialIndex={2} />
		</section>
	);
}
