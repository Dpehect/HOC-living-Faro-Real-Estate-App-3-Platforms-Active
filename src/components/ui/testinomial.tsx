'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Star } from '@/icons/landing-page-icons';
import './testimonial-carousel.css';

export type Testimonial = { id: string; image: string; name: string; text: string; type: string };

export const TestimonialCarousel = ({ items, initialIndex = 0 }: { items: Testimonial[]; initialIndex?: number }) => {
	const [activeIndex, setActiveIndex] = useState(initialIndex);
	const pointerStartX = useRef<number | null>(null);
	const count = items.length;
	const angleStep = 360 / Math.max(count, 1);

	useEffect(() => { if (activeIndex >= count) setActiveIndex(0); }, [activeIndex, count]);

	const goTo = useCallback((index: number) => {
		if (count) setActiveIndex(((index % count) + count) % count);
	}, [count]);

	const getDelta = useCallback((index: number) => {
		let delta = index - activeIndex;
		if (delta > count / 2) delta -= count;
		if (delta < -count / 2) delta += count;
		return delta;
	}, [activeIndex, count]);

	const visibleItems = useMemo(() => items.map((item, index) => ({ item, index, delta: getDelta(index) })), [items, getDelta]);
	if (!count) return null;

	return (
		<div className="testimonial-carousel">
			<div
				className="testimonial-stage"
				role="region"
				aria-roledescription="carousel"
				aria-label="Customer testimonials"
				tabIndex={0}
				onKeyDown={event => {
					if (event.key === 'ArrowRight') { event.preventDefault(); goTo(activeIndex + 1); }
					if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(activeIndex - 1); }
				}}
				onPointerDown={event => { pointerStartX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
				onPointerUp={event => {
					if (pointerStartX.current === null) return;
					const distance = event.clientX - pointerStartX.current;
					if (Math.abs(distance) > 45) goTo(activeIndex + (distance < 0 ? 1 : -1));
					pointerStartX.current = null;
				}}
				onPointerCancel={() => { pointerStartX.current = null; }}
			>
				<div className="testimonial-cylinder" aria-live="polite">
					{visibleItems.map(({ item, index, delta }) => {
						const isActive = index === activeIndex;
						const distance = Math.abs(delta);
						return (
							<article
								key={item.id}
								className="testimonial-slot"
								data-active={isActive}
								aria-hidden={!isActive}
								style={{ transform: `rotateY(${delta * angleStep}deg) translateZ(var(--testimonial-radius))`, opacity: distance <= 1 ? (isActive ? 1 : 0.56) : 0, visibility: distance <= 1 ? 'visible' : 'hidden', zIndex: 20 - Math.round(distance) }}
								onClick={() => !isActive && goTo(index)}
							>
								<blockquote className="testimonial-card">
									<div className="testimonial-stars" aria-label="5 out of 5 stars">
										{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} />)}
									</div>
									<p className="testimonial-quote">“{item.text}”</p>
									<footer className="testimonial-author">
										<img src={item.image} alt="" loading="lazy" />
										<div><cite>{item.name}</cite><span>{item.type}</span></div>
									</footer>
								</blockquote>
							</article>
						);
					})}
				</div>
				<button className="testimonial-arrow testimonial-arrow--left" type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous testimonial"><span aria-hidden="true">←</span></button>
				<button className="testimonial-arrow testimonial-arrow--right" type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next testimonial"><span aria-hidden="true">→</span></button>
			</div>
			<div className="testimonial-dots" role="tablist" aria-label="Choose a testimonial">
				{items.map((item, index) => <button key={item.id} type="button" role="tab" aria-label={`Show testimonial from ${item.name}`} aria-selected={index === activeIndex} onClick={() => goTo(index)} />)}
			</div>
		</div>
	);
};
