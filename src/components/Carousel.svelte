<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { langType } from '../utils/translations/language';
	import type { eventType } from '../utils/type';
	import EventCarousel from './eventCarousel.svelte';

	let {
		data,
		lang,
		translation,
		id = 0,
	}: {
		data: eventType[];
		lang: {
			lang: langType;
		};
		translation: {
			welcome: {
				location: string;
				category: string;
				date: string;
				time: string;
				participant: string;
				price: string;
				moreInformation: string;
			};
		};
		id: number;
	} = $props();
	let currentIndex = $state(0);
	let interval: any;
	let widthTransition = $state(0);
	let hover = $state(false);
	let sizeDom = $state(0);
	function startCarousel() {
		interval = setInterval(() => {
			if (!hover) {
				checkSizeDom();
				if (sizeDom <= 767 && sizeDom > 0) {
					currentIndex = (currentIndex + 1) % data.length;
					widthTransition = currentIndex * -100;
				} else if (sizeDom >= 768) {
					currentIndex = (currentIndex + 1) % (data.length / 2);
					widthTransition = currentIndex * -100;
				}
			}
		}, 3000);
	}
	function checkSizeDom() {
		if (typeof document !== 'undefined') {
			const carousel = document.querySelector(`#carousel${id}`);
			if (carousel) {
				sizeDom = carousel.clientWidth;
			}
		}
	}
	onMount(() => {
		const carousel = document.querySelector(`#carousel${id}`);
		if (carousel) {
			carousel.addEventListener('mouseover', () => (hover = true));
			carousel.addEventListener('mouseout', () => (hover = false));
		}
	});
	function stopCarousel() {
		clearInterval(interval);
	}
	onDestroy(() => {
		stopCarousel;
	});
	startCarousel();
</script>

<div id={`carousel${id}`}>
	<div class="relative h-64 overflow-hidden">
		<div class="carousel flex" style="--widthTransition: {widthTransition}%">
			{#each data as element, index}
				<div class="flex-[0_0_100%] md:flex-[0_0_50%]">
					<EventCarousel data={element} lang={lang.lang} {translation} {index} />
				</div>
			{/each}
		</div>
	</div>
	<div class="mb-5 mt-2.5 flex justify-center gap-5">
		{#each data as element, index}
			{#if sizeDom <= 767}
				<a
					href={`#${index}`}
					onclick={() => ((widthTransition = index * -100), (currentIndex = index))}
					aria-label="paginationCarousel"
					class="h-6 w-6 rounded-3xl md:hidden {currentIndex === index
						? 'bg-orange'
						: 'bg-[#d9d9d9]'} duration-[1.5s]"
				></a>
			{:else if sizeDom >= 768 && index / 2 <= 0.5}
				<a
					href={`#${index}`}
					onclick={() => ((widthTransition = index * -100), (currentIndex = index))}
					aria-label="paginationCarousel"
					class="hidden h-6 w-6 rounded-3xl md:block {currentIndex === index
						? 'bg-orange'
						: 'bg-[#d9d9d9]'} duration-[1.5s]"
				></a>
			{/if}
		{/each}
	</div>
</div>

<style>
	.carousel {
		transform: translateX(var(--widthTransition, 0));
		transition: transform 1s ease-in-out;
	}
</style>
