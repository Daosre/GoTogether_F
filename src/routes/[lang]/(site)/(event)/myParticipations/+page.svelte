<script lang="ts">
	import Event from '../../../../../components/evenement/event.svelte';
	import Pagination from '../../../../../components/pagination.svelte';
	import SearchBar from '../../../../../components/searchBar/searchBar.svelte';
	import { requestGet } from '../../../../../services/requestGet';
	import { handleError } from '../../../../../utils/handleError';
	import { language } from '../../../../../utils/translations/language';
	import type { getEventListResponseType } from '../../../../../utils/type';

	let { data } = $props();
	let search = $state('');
	let location = $state('');
	let responseEventList: getEventListResponseType | undefined = $state();
	let page = $state(0);
	$effect(() => {
		search;
		location;
		page;
		const delay = setTimeout(() => {
			requestGet(
				`evenement/searchMyParticipations?search=${search}&location=${location}&page=${page}`,
			).then((res) => {
				console.log(res);
				handleError(res.status);
				if (res.response) {
					responseEventList = res.response;
				}
			});
		}, 500);
		return () => {
			clearTimeout(delay);
		};
	});
	let translation = $state(language[data.lang]);
	$effect(() => {
		translation = language[data.lang];
	});
</script>

<main class="grow text-center">
	<SearchBar {data} bind:search bind:location />
	{#if responseEventList}
		<h1 class="Damion mb-2.5 text-2xl lg:mb-[30px] lg:text-5xl">
			{translation.welcome.titleSearchEvent}
			{responseEventList?.countEvent}
		</h1>
		<section
			class="flex flex-col items-center gap-5 md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-3 lg:gap-[30px] lg:px-40"
		>
			{#each responseEventList.data as event}
				<Event data={event} lang={data.lang} {translation} />
			{/each}
		</section>
		<Pagination isNextPage={responseEventList.isNextPage} bind:page />
	{/if}
</main>
