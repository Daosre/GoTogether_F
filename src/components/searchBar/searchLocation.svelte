<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import { getCity } from '../../services/getCity';

	import { language, type langType } from '../../utils/translations/language';
	let { location = $bindable(), data }: { data: langType; location: string } = $props();
	let translations = $state(language[data]);

	$effect(() => {
		translations = language[data];
	});

	let citysFind: { nom: '' }[] = $state([]);
	$effect(() => {
		if (location) {
			const delay = setTimeout(() => {
				getCity(location).then((res) => {
					citysFind = res.response;
				});
			}, 250);
			return () => {
				clearTimeout(delay);
			};
		} else {
			citysFind = [];
		}
	});
</script>

<div class="relative">
	<input
		bind:value={location}
		id="location"
		type="text"
		list="listLocation"
		class="Agdasima inputshadow h-[50px] w-[300px] rounded-[10px] border-black bg-[#78788010] text-center text-[#212121] placeholder:text-[#21212150] lg:w-[400px]"
		placeholder="{translations.search}..."
	/>
	<label for="location"><MapPin class="absolute right-2 top-[14px]" /></label>
	<datalist id="listLocation">
		{#each citysFind as city}
			<option value={city.nom}>{city.nom}</option>
		{/each}
	</datalist>
</div>
