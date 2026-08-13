import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

export function PropertiesList() {
	var images = [
		'https://framerusercontent.com/images/Mf2SbSsE4lrNP12Wus9NuA1xVU.webp?scale-down-to=512',
		'https://framerusercontent.com/images/gZQ1apomkY0bpjjPuzg5BkBzrvw.webp?scale-down-to=512',
		'https://framerusercontent.com/images/Zud5Mr2yDfQ2NTPWvbbQhXk2o.webp?scale-down-to=512',
		'https://framerusercontent.com/images/TJkxr7JUIQ96M8wbkj8nF3rlg.webp?scale-down-to=512',
		'https://framerusercontent.com/images/oShABW70GatY4xZtrOLuGWvEc.webp?scale-down-to=512',
	];

	return (
		<main className="py-4 overflow-hidden flex flex-col gap-2">
			<h2 className="text-3xl mx-auto w-full text-center font-bold text-gray-800 mb-2">
				Find your next home at a fair price
			</h2>
			<p className="text-center text-gray-600 mb-8 px-4">
				1,098 properties for sale and rent across München and Bayern
			</p>
			<div className=" flex flex-col  bg-white  items-center justify-center relative overflow-hidden">
				<InfiniteMovingCards items={images} direction="left" speed="fast" />
			</div>
			<div className=" flex flex-col  bg-white  items-center justify-center relative overflow-hidden">
				<InfiniteMovingCards items={images} direction="right" speed="fast" />
			</div>
		</main>
	);
}
