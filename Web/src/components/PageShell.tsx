import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';

export default function PageShell({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle?: string;
	children: ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col bg-[#f7f8fb]">
			<SiteNavbar />
			<main className="mx-auto w-full max-w-[1100px] flex-1 px-4 py-10 md:px-8 md:py-14">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				>
					<h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{title}</h1>
					{subtitle && <p className="mt-3 max-w-2xl text-base text-gray-500 md:text-lg">{subtitle}</p>}
					<div className="mt-8">{children}</div>
				</motion.div>
			</main>
			<SiteFooter />
		</div>
	);
}
