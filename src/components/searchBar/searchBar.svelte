<script lang="ts">
	import SearchLocation from './searchLocation.svelte';
	import Search from './search.svelte';
	let { search = $bindable(), location = $bindable() } = $props();
</script>

<div class="flex flex-col items-center gap-4 p-4 md:flex-row md:justify-center md:gap-6 lg:gap-20">
	<Search bind:search />
	<SearchLocation bind:location />
</div>
