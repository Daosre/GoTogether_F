<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { language, type langType } from '../../utils/translations/language';
	let { search = $bindable(), data }: { data: langType; search: string } = $props();
	let translations = $state(language[data]);
	let isDark: { get: () => boolean } = getContext('isDark');

	$effect(() => {
		translations = language[data];
	});
</script>

<div class="relative">
	<input
		bind:value={search}
		id="search"
		type="text"
		class="Agdasima {isDark.get()
			? 'bg-[#FCF8F4]'
			: 'text-black'} inputshadow h-[50px] w-[300px] rounded-[10px] border-black bg-[#78788010] text-center text-[#212121] placeholder:text-[#21212150] lg:w-[400px]"
		placeholder="{translations.search}..."
	/>
	<label for="search"><Search class="absolute right-2 top-[14px]" /></label>
</div>
