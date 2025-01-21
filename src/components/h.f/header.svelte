<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import Darkmode from '../darkMode/darkmode.svelte';
	import Avatar from '../icon/avatar.svelte';
	import Deco from '../icon/deco.svelte';
	import NavA from '../nav/navA.svelte';
	import Logoh from './logoh.svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
</script>

<header
	class="flex items-center justify-evenly border-2 border-black {isDark.get()
		? 'darkmode'
		: 'lightmode'}"
>
	<Logoh />
	<NavA />
	<Avatar />
	<Deco />
	<Darkmode />
	<Menu class="{isDark.get() ? 'burgerDM' : 'burgerLM'} lg:hidden" />
</header>
