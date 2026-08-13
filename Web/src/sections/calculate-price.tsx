import { Slider } from '@/components/ui/slider';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CaculatePriceSection() {
	// slider 0-100 maps to sale price €100k – €600k
	const [value, setValue] = useState([40]);
	const salePrice = 100000 + value[0] * 5000;
	// Compare traditional ~5% vs our illustrative 3.5% package
	const traditionalFee = Math.round(salePrice * 0.05);
	const ourFee = Math.round(salePrice * 0.035);
	const saving = traditionalFee - ourFee;

	const leftItemVariants = {
		hidden: { opacity: 0, x: -100 },
		visible: { opacity: 1, x: 0, transition: { type: 'tween', duration: 0.5 } },
	};
	const rightItemVariants = {
		hidden: { opacity: 0, x: 100 },
		visible: { opacity: 1, x: 0, transition: { type: 'tween', duration: 0.5 } },
	};

	return (
		<div className="flex flex-col md:flex-row mx-4 md:mx-36 gap-8 justify-between">
			<motion.div
				initial="hidden"
				whileInView="visible"
				variants={leftItemVariants}
				className="w-full md:w-3/6 shadow-md p-8 rounded-2xl bg-white"
			>
				<h2 className="text-3xl mx-auto w-full font-semibold text-gray-800 mb-4">
					You could save
					<br />
					<span className="text-primary font-bold">€ {saving.toLocaleString()}</span>
				</h2>
				<p className="text-sm text-gray-500 mb-4">
					Illustrative saving versus a typical 5% agency fee, using our 3.5% full-service package
					(example only — final terms confirmed in writing).
				</p>
				<div className="flex justify-between mb-2 text-sm">
					<div>Estimated sale price</div>
					<div className="font-semibold">€ {salePrice.toLocaleString()}</div>
				</div>
				<Slider value={value} onValueChange={setValue} max={100} step={1} />
				<div className="mt-3 flex justify-between text-xs text-gray-400">
					<span>€ 100,000</span>
					<span>€ 600,000</span>
				</div>
				<div className="mt-6 space-y-1 text-sm text-gray-600">
					<div className="flex justify-between">
						<span>Typical 5% fee</span>
						<span>€ {traditionalFee.toLocaleString()}</span>
					</div>
					<div className="flex justify-between">
						<span>HOC Living Faro 3.5%</span>
						<span>€ {ourFee.toLocaleString()}</span>
					</div>
				</div>
				<div className="w-full mt-8">
					<Button asChild className="flex justify-center mx-auto text-white bg-primary hover:bg-accentHover">
						<Link to="/home-value">Book a free property valuation</Link>
					</Button>
					<p className="text-center mt-4 text-xs text-gray-400">Figures are examples, not a formal quote.</p>
				</div>
			</motion.div>
			<motion.div
				initial="hidden"
				whileInView="visible"
				variants={rightItemVariants}
				className="h-80 flex-1 object-cover"
			>
				<img
					className="h-80 w-full object-cover rounded-2xl"
					src="https://purplebricks-web.imgix.net/web-images/marketing-global/uk/savings-calculator/saving_calculator_2022.jpg?h=435&auto=format"
					alt="Property valuation"
				/>
			</motion.div>
		</div>
	);
}
