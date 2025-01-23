<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import Darkmode from '../darkMode/darkmode.svelte';
	import Avatar from '../icon/avatar.svelte';
	import Deco from '../icon/deco.svelte';
	import Logoh from './logoh.svelte';
	import { readToken } from '../../utils/token';
	import { Role } from '../../utils/const';
	import type { tokenType } from '../../utils/type';
	import NavA from '../nav/navA.svelte';
	import Translate from './translate.svelte';
	import NavU from '../nav/navU.svelte';
	import NavV from '../nav/navV.svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
	let token: tokenType | null = readToken();
	let { data } = $props();
</script>

<header
	class="flex items-center justify-evenly border-2 border-black {isDark.get()
		? 'darkmode'
		: 'lightmode'}"
>
	<Logoh />
	{#if token?.role === Role.ADMIN}
		<NavA data={data.lang} />
	{:else if token?.role === Role.USER}
		<NavU data={data.lang} />
	{:else}
		<NavV data={data.lang} />
	{/if}

	<Avatar />
	<Deco />
	<Darkmode />
	<Translate {data} />
	<Menu class="{isDark.get() ? 'burgerDM' : 'burgerLM'} lg:hidden" />
</header>
