<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { getContext } from 'svelte';
	let isDark: { get: () => boolean; set: () => void } = getContext('isDark');
</script>

<div
	class="darkmodeinner border-floralWhite relative flex h-[35px] w-[113px] items-center justify-between rounded-[20px] border-[0.5px] bg-white p-1
  {isDark.get() ? 'darkmode' : 'lightmode'}"
>
	<button
		aria-label="button"
		class="border-orange absolute left-[2px] flex h-[30px] w-[30px] justify-between rounded-[20px] border-2 {isDark.get()
			? 'darkmodeAnimation'
			: 'lightmodeAnimation'}"
		onclick={() => {
			isDark.set();
		}}
	></button>
	<Sun color="#F18046" />
	<Moon class={isDark.get() ? 'text-white' : 'color-black'} />
</div>
