<script lang="ts">
	import SearchBar from '../../../../../components/searchBar/searchBar.svelte';

	let { data } = $props();
</script>

<main>
	<SearchBar {data} />
</main>
