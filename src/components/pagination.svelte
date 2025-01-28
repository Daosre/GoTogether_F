<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { getContext } from 'svelte';
	let isDark: { get: () => boolean } = getContext('isDark');

	let { page = $bindable(), isNextPage } = $props();
</script>

<section class="mt-5 flex justify-center gap-5 {isDark.get() ? 'text-white' : ''} ">
	<ArrowLeft
		class={page > 0 ? 'cursor-pointer' : 'opacity-0'}
		onclick={() => {
			if (page > 0) {
				page--;
			}
		}}
	/>
	<p>{page + 1}</p>

	<ArrowRight
		class={isNextPage ? 'cursor-pointer' : 'opacity-0'}
		onclick={() => {
			if (isNextPage) {
				page++;
			}
		}}
	/>
</section>
