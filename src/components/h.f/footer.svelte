<script lang="ts">
	import '../../app.css';
	let isDark: boolean = $state(false);
</script>

<article
	class="bg-floralWhite h-[70px] w-full border-t border-black md:h-[94px] lg:h-[116px] {isDark
		? 'footerDM'
		: 'footerLM'}"
>
	<ol
		class="Lato flex items-center justify-center gap-10 p-2 text-[13px] md:text-[16px] lg:text-[24px]"
	>
		<a href="/">Conditions Générales</a>
		<a href="/">Mentions Légales</a>
	</ol>
	<a
		href="/"
		class="Lato flex flex-col items-center justify-center text-[13px] md:mt-2 md:text-[16px] lg:text-[24px]"
		>© Copyright</a
	>
</article>
