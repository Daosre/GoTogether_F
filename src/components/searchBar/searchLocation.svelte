<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	let { location = $bindable() } = $props();
</script>

<div class="relative">
	<input
		bind:value={location}
		id="location"
		type="text"
		class="Agdasima inputshadow h-[50px] w-[300px] rounded-[10px] border-black bg-[#78788010] text-center text-[#212121] placeholder:text-[#21212150] lg:w-[400px]"
		placeholder="Localisation..."
	/>
	<label for="location"><MapPin class="absolute right-2 top-[14px]" /></label>
</div>
