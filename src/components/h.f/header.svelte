<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import Darkmode from '../darkMode/darkmode.svelte';
	import Avatar from '../icon/avatar.svelte';
	import Deco from '../icon/deco.svelte';
	import NavV from '../nav/navV.svelte';
	import Logoh from './logoh.svelte';
	import { readToken } from '../../utils/token';
	import { Role } from '../../utils/const';
	import NavA from '../nav/navA.svelte';
	import NavU from '../nav/navU.svelte';
	import type { tokenType } from '../../utils/type';
	let isDark: { get: () => boolean } = getContext('isDark');
	let token: tokenType | null = readToken();
</script>

<header
	class="flex items-center justify-evenly border-2 border-black {isDark.get()
		? 'darkmode'
		: 'lightmode'}"
>
	<Logoh />
	{#if token?.role === Role.ADMIN}
		<NavA />
	{:else if token?.role === Role.USER}
		<NavU />
	{:else}
		<NavV />
	{/if}
	<Avatar />
	<Deco />
	<Darkmode />
	<Menu class="{isDark.get() ? 'burgerDM' : 'burgerLM'} lg:hidden" />
</header>
