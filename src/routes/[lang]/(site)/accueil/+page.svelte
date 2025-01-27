<script lang="ts">
	import { getContext } from 'svelte';
	import Pagination from '../../../../components/pagination.svelte';
	import SearchBar from '../../../../components/searchBar/searchBar.svelte';
	import { requestGet } from '../../../../services/requestGet';
	import { handleError } from '../../../../utils/handleError';
	import { language, type langType } from '../../../../utils/translations/language';
	import type { eventType, getEventListResponseType } from '../../../../utils/type';
	import Carousel from '../../../../components/evenement/Carousel.svelte';
	import EventCarousel from '../../../../components/evenement/eventCarousel.svelte';
	import Event from '../../../../components/evenement/event.svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
	let { data }: { data: { lang: langType } } = $props();
	let search = $state('');
	let location = $state('');
	let page = $state(0);
	let responseEventList: getEventListResponseType | undefined = $state();
	let mostEventRecent: eventType[] = $state([]);
	let mostEventPopular: eventType[] = $state([]);
	$effect(() => {
		search;
		location;
		page;
		console.log(search, location);
		if (!search && !location) {
			responseEventList = undefined;
			requestGet('evenement/mostRecent').then((res) => {
				handleError(res.status);
				mostEventRecent = res.response.data;
			});
			requestGet('evenement/mostPopular').then((res) => {
				handleError(res.status);
				mostEventPopular = res.response.data;
			});
		} else {
			const delay = setTimeout(() => {
				requestGet(`evenement/search?search=${search}&location=${location}&page=${page}`).then(
					(res) => {
						handleError(res.status);
						if (res.response) {
							responseEventList = res.response;
						}
					},
				);
			}, 500);
			return () => {
				clearTimeout(delay);
			};
		}
	});
	let translation = $state(language[data.lang]);
	$effect(() => {
		translation = language[data.lang];
	});
</script>

<main class="grow text-center {isDark.get() ? 'darkmode' : 'lightmode'}">
	<SearchBar bind:search bind:location {data} />
	{#if mostEventRecent && !responseEventList}
		<section>
			<h2
				class="Damion {isDark.get() ? 'text-white' : 'text-black'}  mb-2.5 text-2xl xl:text-[40px]"
			>
				{translation.welcome.titleRecentEvent}
			</h2>
			<Carousel data={mostEventRecent} id={1}>
				{#each mostEventRecent as element, index}
					<div class="flex-[0_0_100%] md:flex-[0_0_50%]">
						<EventCarousel data={element} lang={data.lang} {translation} {index} />
					</div>
				{/each}
			</Carousel>
		</section>
		<section>
			<h2
				class="Damion {isDark.get() ? 'text-white' : 'text-black'} mb-2.5 text-2xl xl:text-[40px]"
			>
				{translation.welcome.titlePopularEvent}
			</h2>
			<Carousel data={mostEventPopular} id={2}>
				{#each mostEventPopular as element, index}
					<div class="flex-[0_0_100%] md:flex-[0_0_50%]">
						<EventCarousel data={element} lang={data.lang} {translation} {index} />
					</div>
				{/each}
			</Carousel>
		</section>
	{:else if responseEventList}
		<h1 class="Damion mb-2.5 text-2xl lg:mb-[30px] lg:text-5xl">
			{translation.welcome.titleSearchEvent}
			{responseEventList.countEvent}
		</h1>
		<section
			class="flex flex-col items-center md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-3 lg:gap-[30px] lg:px-40"
		>
			{#each responseEventList.data as dataEvent}
				<Event data={dataEvent} lang={data.lang} {translation} />
			{/each}
		</section>
		<Pagination isNextPage={responseEventList.isNextPage} bind:page />
	{/if}
</main>
