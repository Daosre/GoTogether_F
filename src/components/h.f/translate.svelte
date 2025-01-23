<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getContext } from 'svelte';
	import type { language } from '../../utils/translations/language';
	import { listFlag, listLanguage } from '../../utils/const';

	let { data } = $props();
	function handleClick(langue: keyof typeof language) {
		const newUrl = data.url.replace(page.params.lang, langue);
		goto(newUrl);
	}
	console.log(listFlag[data]);
</script>

{#each listLanguage as dataLang}
	<button onclick={() => handleClick(dataLang)}
		><img src={listFlag[dataLang]} alt="flag's language" class="w-[30px]" /></button
	>
{/each}
