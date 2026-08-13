import './App.css';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	BuildingIcon,
	ThumbsUpIcon,
	UsersIcon,
	MicroscopeIcon,
	HamburgerIcon, // Assuming you have a HamburgerIcon component
} from '@/icons/landing-page-icons';
import gifimg from './hello.gif';
import { CountUpCard } from './components/countup-card';
import FeaturesSection from './sections/features';
import SellHomeSection from './sections/sell-home';
import { PropertiesList } from './sections/properties';
import { CaculatePriceSection } from './sections/calculate-price';
import TestimonialSection from './sections/testimonial';
import SiteFooter from '@/components/SiteFooter';
import { Link, useNavigate } from 'react-router-dom';
import SiteNavbar from '@/components/SiteNavbar';

// Define animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const leftItemVariants = {
	hidden: { opacity: 0, x: -100 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: 'tween',
			duration: 0.5,
		},
	},
};

const rightItemVariants = {
	hidden: { opacity: 0, x: 100 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: 'tween',
			duration: 0.5,
		},
	},
};
const links = [
	{ text: 'Buy or Rent', href: '/buy-rent' },
	{ text: 'Sell or List', href: '/sell-list' },
	{ text: 'Home Value', href: '/home-value' },
	{ text: 'Franchise', href: '/franchise' },
];
export default function App() {
	return (
		<div className="w-full overflow-x-hidden">
			<div className="bg-bgColor">
				<SiteNavbar />
				<motion.div
					className="container px-6 py-16 flex flex-col lg:flex-row justify-between items-center"
					initial="hidden"
					animate="visible"
					variants={containerVariants}
				>
					<motion.div className="lg:w-1/2 lg:mr-4" variants={leftItemVariants}>
						<h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 text-center lg:text-left">
							Homes across München & Bayern
						</h1>
						<p className="text-gray-600 mb-6 text-center lg:text-left">
							Search 1,098 live listings in 539 cities — from Schwabing apartments to homes in Maxvorstadt, Bogenhausen and beyond.
						</p>
						<motion.div
							className="flex items-center bg-white shadow-md rounded-lg overflow-hidden"
							variants={leftItemVariants}
						>
							<Input
								placeholder="Search properties in your city"
								className="flex-grow px-4 py-2"
							/>
							<Button className="bg-primary text-white px-4 py-2">
								<MicroscopeIcon className="h-5 w-5" />
							</Button>
						</motion.div>
						<motion.div
							className="mt-8 grid grid-cols-3 gap-2 md:gap-8 text-center"
							variants={leftItemVariants}
						>
							<CountUpCard icon={BuildingIcon} end={1098} label="Listings" />
							<CountUpCard icon={UsersIcon} end={539} label="Cities covered" />
<CountUpCard icon={ThumbsUpIcon} end={482} label="For rent" />
						</motion.div>
					</motion.div>
					<motion.div
						className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end"
						variants={rightItemVariants}
					>
						<img
							// src="https://giphy.com/embed/ZCkD0qVCXkWXtiBGUT"
							src={gifimg}
							// width="480"
							// height="360"
							// frameBorder="0"
							className="rounded-lg shadow-lg w-full  object-cover bg-cover"
							// allowFullScreen
						></img>
					</motion.div>
				</motion.div>
			</div>
			<div className="flex mt-6 flex-col gap-6 w-full">
				<PropertiesList />
				<FeaturesSection />
				<CaculatePriceSection />
				<SellHomeSection />
				<TestimonialSection />
				<SiteFooter />
			</div>
		</div>
	);
}
