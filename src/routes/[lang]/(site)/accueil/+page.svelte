<script lang="ts">
	import Event from '../../../../components/event.svelte';
	import Pagination from '../../../../components/pagination.svelte';
	import SearchBar from '../../../../components/searchBar/searchBar.svelte';
	import { requestGet } from '../../../../services/requestGet';
	import { handleError } from '../../../../utils/handleError';
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
</script>

<main class="grow text-center">
	<SearchBar bind:search bind:location {data} />
	{#if responseEventList}
		<h1 class="Damion text-5xl">Resultats trouvé : {responseEventList.countEvent}</h1>
		{#each responseEventList.data as data}
			<Event {data} />
		{/each}
		<Pagination isNextPage={responseEventList.isNextPage} bind:page />
	{/if}
</main>
