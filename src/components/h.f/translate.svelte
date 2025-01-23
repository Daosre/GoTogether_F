<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { listFlag, listLanguage } from '../../utils/const';
	import type { language } from '../../utils/translations/language';

	let { data } = $props();
	function handleClick(langue: keyof typeof language) {
		const newUrl = data.url.replace(page.params.lang, langue);
		goto(newUrl);
	}
</script>

<div class="GrandiFlora flex gap-10">
	{#each listLanguage as dataLang}
		<button onclick={() => handleClick(dataLang)}
			><img src={listFlag[dataLang]} alt="flag's language" class="w-[34px]" /></button
		>
	{/each}
</div>
