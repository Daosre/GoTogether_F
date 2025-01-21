<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import Darkmode from '../darkMode/darkmode.svelte';
	import Logoh from './logoh.svelte';
	import { getContext } from 'svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
</script>

<header
	class="flex items-center justify-evenly border-2 border-black {isDark.get()
		? 'darkmode'
		: 'lightmode'}"
>
	<Logoh />
	<Darkmode />
	<Menu class="{isDark.get() ? 'burgerDM' : 'burgerLM'} lg:hidden" />
</header>
