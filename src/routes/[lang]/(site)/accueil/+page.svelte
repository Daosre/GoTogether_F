<script lang="ts">
	import Event from '../../../../components/event.svelte';
	import Pagination from '../../../../components/pagination.svelte';
	import SearchBar from '../../../../components/searchBar/searchBar.svelte';
	import { requestGet } from '../../../../services/requestGet';
	import { handleError } from '../../../../utils/handleError';
	import { language } from '../../../../utils/translations/language';
	import type { getEventListResponseType } from '../../../../utils/type';

	let { data } = $props();
	let search = $state('');
	let location = $state('');
	let page = $state(0);
	let responseEventList: getEventListResponseType | undefined = $state();
	$effect(() => {
		search;
		location;
		page;
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
	});
	let translation = $state(language[data.lang]);
	$effect(() => {
		translation = language[data.lang];
	});
</script>

<main class="grow text-center">
	<SearchBar bind:search bind:location {data} />
	{#if responseEventList}
		<h1 class="Damion mb-2.5 text-2xl lg:mb-[30px] lg:text-5xl">
			Resultats trouvé : {responseEventList.countEvent}
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
