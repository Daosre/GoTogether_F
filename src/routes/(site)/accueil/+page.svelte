<script lang="ts">
	import Event from '../../../components/event.svelte';
	import SearchBar from '../../../components/searchBar.svelte';
	import { requestGet } from '../../../services/requestGet';
	import type { getEventListResponseType } from '../../../utils/type';
	let search = $state('');
	let location = $state('');
	let responseEventList: getEventListResponseType | undefined = $state();
	$effect(() => {
		// if (search || location) {
		const delay = setTimeout(() => {
			requestGet(`evenement/search?search=${search}&location=${location}`).then((res) => {
				if (res.response) {
					responseEventList = res.response;
				}
			});
		}, 500);
		return () => {
			clearTimeout(delay);
		};
		// } else {
		// 	requestGet(`evenement/search?search=${search}&location=${location}`).then((res) =>
		// 		console.log(res),
		// 	);
		// }
	});
</script>

<main class="grow">
	<SearchBar bind:search bind:location />
	{#if responseEventList}
		{#each responseEventList.data}
			<Event />
		{/each}
	{/if}
</main>
