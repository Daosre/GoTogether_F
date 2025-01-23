<script lang="ts">
	import { getContext } from 'svelte';
	import '../../app.css';
	import { language, type langType } from '../../utils/translations/language';
	let isDark: { get: () => boolean } = getContext('isDark');
	let { lang }: { lang: langType } = $props();
	let translation = $state(language[lang]);
	$effect(() => {
		lang;
		translation = language[lang];
	});
</script>

<article
	class="h-[70px] w-full border-t border-black bg-floralWhite md:h-[94px] lg:h-[116px] {isDark.get()
		? 'bg-black'
		: 'bg-white'}"
>
	<ol
		class="Lato flex items-center justify-center gap-10 p-2 text-[13px] md:text-[16px] lg:text-[24px]"
	>
		<a href="/">{translation.footer.condition}</a>
		<a href="/">{translation.footer.notice}</a>
	</ol>
	<a
		href="/"
		class="Lato flex flex-col items-center justify-center text-[13px] md:mt-2 md:text-[16px] lg:text-[24px]"
		>© Copyright</a
	>
</article>
