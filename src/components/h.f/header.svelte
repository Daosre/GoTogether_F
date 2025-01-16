<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import Darkmode from '../darkMode/darkmode.svelte';
	import Logoh from './logoh.svelte';
	import { getContext } from 'svelte';
	let isDark = getContext('isDark');
</script>

<header
	class="flex items-center justify-evenly border-2 border-black {isDark ? 'darkmode' : 'lightmode'}"
>
	<Logoh />
	<Darkmode />
	<Menu class={isDark ? 'burgerDM' : 'burgerLM'} />
</header>
