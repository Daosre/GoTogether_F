<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import Darkmode from '../darkMode/darkmode.svelte';
	import Logoh from './logoh.svelte';
	let { isDark = $bindable() } = $props();
</script>

<header
	class="flex items-center justify-evenly border-2 border-black {isDark ? 'darkmode' : 'lightmode'}"
>
	<Logoh />
	<Darkmode bind:isDark />
	<Menu class={isDark ? 'burgerDM' : 'burgerLM'} />
</header>
