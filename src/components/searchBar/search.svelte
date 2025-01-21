<script lang="ts">
	import { Search } from 'lucide-svelte';
	let { search = $bindable() } = $props();
</script>

<div class="relative">
	<input
		bind:value={search}
		id="search"
		type="text"
		class="Agdasima inputshadow h-[50px] w-[300px] rounded-[10px] border-black bg-[#78788010] text-center text-[#212121] placeholder:text-[#21212150] lg:w-[400px]"
		placeholder="Recherche..."
	/>
	<label for="search"><Search class="absolute right-2 top-[14px]" /></label>
</div>
