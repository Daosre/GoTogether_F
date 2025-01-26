<script lang="ts">
	import SearchBar from '../../../../../components/searchBar/searchBar.svelte';
	import { requestGet } from '../../../../../services/requestGet';
	import { handleError } from '../../../../../utils/handleError';
	import { language } from '../../../../../utils/translations/language';
	import type { getEventListResponseType } from '../../../../../utils/type';

	let { data } = $props();
	let search = $state();
	let location = $state();
	let responseEventList: getEventListResponseType | undefined = $state();
	let page = $state(0);
	$effect(() => {
		search;
		location;
		page;
		const delay = setTimeout(() => {
			requestGet(`evenement/search?search=${search}&location=${location}&page=${page}`).then(
				(res) => {
					console.log(res);
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

<main class="grow">
	<SearchBar {data} bind:search bind:location />
	<h1 class="Damion mb-2.5 text-2xl lg:mb-[30px] lg:text-5xl">
		{#if responseEventList}
			{translation.welcome.titleSearchEvent}
			{responseEventList?.countEvent}
		{/if}
	</h1>
</main>
