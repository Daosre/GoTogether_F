<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { listLanguage } from '../../utils/const';
	import type { language } from '../../utils/translations/language';

	let { data } = $props();
	function handleClick(langue: keyof typeof language) {
		const newUrl = data.url.replace(page.params.lang, langue);
		goto(newUrl);
	}
</script>

<div class="GrandiFlora flex gap-2">
	{#each listLanguage as dataLang}
		<button class="" onclick={() => handleClick(dataLang)}>{dataLang.toLocaleUpperCase()} </button>
	{/each}
</div>
