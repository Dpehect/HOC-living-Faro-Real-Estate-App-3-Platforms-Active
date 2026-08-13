import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
	return (
		<section className="container mx-auto px-6 py-8">
			<h2 className="text-3xl mx-auto w-full text-center font-bold text-gray-800 mb-8">
				Why sell your house with HOC Living Faro?
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<AnimatedCard
					index={1}
					imageSrc="https://purplebricks-web.imgix.net/marketing-global/uk/proposition-tiles/dedicated-local-experts-2021.jpg?w=768&auto=format&q=50&ar=407%3A226&fit=crop&ixlib=react-9.2.0"
					heading="Local experts in every region"
					details="Our agents know Faro, the wider Algarve, Lisbon, Porto and key Spanish markets. You get neighbourhood-level advice, not generic online estimates."
					buttonText="Meet your experts"
					to="/experts"
				/>
				<AnimatedCard
					index={2}
					imageSrc="https://purplebricks-web.imgix.net/marketing-global/uk/proposition-tiles/fair-fixed-fee-2021.jpg?w=768&auto=format&q=50&ar=407%3A226&fit=crop&ixlib=react-9.2.0"
					heading="Clear fees, no surprises"
					details="Commission and marketing costs are explained before you sign. Compare our fixed-style packages with traditional high-street rates and keep more of your sale price."
					buttonText="Get a valuation"
					to="/home-value"
				/>
				<AnimatedCard
					index={3}
					imageSrc="https://purplebricks-web.imgix.net/marketing-global/uk/proposition-tiles/better-selling-experience-640@2x.jpg?w=768&auto=format&q=50&ar=407%3A226&fit=crop&ixlib=react-9.2.0"
					heading="Faster path to completion"
					details="Professional photos, portal exposure and coordinated viewings help serious buyers move quickly. We stay with you from first offer through to notary day."
					buttonText="List your property"
					to="/sell"
				/>
			</div>
		</section>
	);
};

const AnimatedCard = ({ index, imageSrc, heading, details, buttonText, to }) => {
	const ref = useRef();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['0 1', '1.33 1'],
	});
	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
	return (
		<motion.div
			ref={ref}
			className="bg-white rounded-lg overflow-hidden shadow-lg"
			style={{
				scale: scaleProgress,
				opacity: opacityProgress,
			}}
			key={index}
			viewport={{ once: true }}
		>
			<img src={imageSrc} alt="" className="w-full h-60 object-cover" />
			<div className="p-6">
				<h3 className="text-xl font-bold text-gray-800 mb-4">{heading}</h3>
				<p className="text-gray-600 mb-6">{details}</p>
				<Link
					to={to}
					className="block border border-slate-700 p-2 text-center text-sm font-semibold transition hover:border-primary hover:text-primary"
				>
					{buttonText}
				</Link>
			</div>
		</motion.div>
	);
};

export default FeaturesSection;
