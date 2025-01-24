<script lang="ts">
	import Search from './search.svelte';
	import SearchLocation from './searchLocation.svelte';
	let { search = $bindable(), location = $bindable(), data } = $props();
</script>

<div class="flex flex-col items-center gap-4 p-5 md:flex-row md:justify-center md:gap-6 lg:gap-40">
	<Search bind:search data={data.lang} />
	<SearchLocation bind:location data={data.lang} />
</div>
