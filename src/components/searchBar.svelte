<script lang="ts">
	import { MapPin, Search } from 'lucide-svelte';
	let { search = $bindable(), location = $bindable() } = $props();
</script>

<div class="flex flex-col items-center gap-4 p-4 md:flex-row md:justify-center md:gap-6 lg:gap-20">
	<div class="relative">
		<input
			value={search}
			oninput={(e) => (search = e.currentTarget.value)}
			id="search"
			type="text"
			class="Agdasima inputshadow h-[50px] w-[300px] rounded-[10px] border-black bg-[#78788010] text-center text-[#212121] placeholder:text-[#21212150] lg:w-[400px]"
			placeholder="Recherche..."
		/>
		<label for="search"><Search class="absolute right-2 top-[14px]" /></label>
	</div>
	<div class="relative">
		<input
			value={location}
			oninput={(e) => (location = e.currentTarget.value)}
			id="location"
			type="text"
			class="Agdasima inputshadow h-[50px] w-[300px] rounded-[10px] border-black bg-[#78788010] text-center text-[#212121] placeholder:text-[#21212150] lg:w-[400px]"
			placeholder="Localisation..."
		/>
		<label for="location"><MapPin class="absolute right-2 top-[14px]" /></label>
	</div>
</div>
