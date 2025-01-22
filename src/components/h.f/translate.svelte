<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getContext } from 'svelte';
	import type { language } from '../../utils/translations/language';
	import { listLanguage } from '../../utils/const';

	let lang: { set: (value: keyof typeof language) => void } = getContext('lang');
	let { data } = $props();
	function handleClick(langue: keyof typeof language) {
		const newUrl = data.url.replace(page.params.lang, langue);
		lang.set(langue);
		goto(newUrl);
	}
</script>

{#each listLanguage as dataLang}
	<button onclick={() => handleClick(dataLang)}>{dataLang.toLocaleUpperCase()}</button>
{/each}
