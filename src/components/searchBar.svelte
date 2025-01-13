<script lang="ts">
	import { Map, MapPin, MapPinHouse, MapPinPlusIcon, Search } from 'lucide-svelte';
</script>

<div class="flex flex-col items-center gap-4 p-4 md:flex-row md:justify-center md:gap-6">
	<div class="relative">
		<input
			type="text"
			class="Agdasima inputshadow relative h-[50px] w-[300px] rounded-[10px] border-black bg-[#78788010] text-center text-[#212121] placeholder:text-[#21212150]"
			placeholder="Recherche..."
		/>
		<Search class="absolute right-2 top-[14px]" />
	</div>
	<div class="relative">
		<input
			type="text"
			class="Agdasima inputshadow h-[50px] w-[300px] rounded-[10px] border-black bg-[#78788010] text-center text-[#212121] placeholder:text-[#21212150]"
			placeholder="Localisation..."
		/>
    <MapPin class="absolute right-2 top-[14px]"/>
	</div>
</div>
