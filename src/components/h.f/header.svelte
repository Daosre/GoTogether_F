<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { Role } from '../../utils/const';
	import { readToken } from '../../utils/token';
	import type { tokenType } from '../../utils/type';
	import Darkmode from '../darkMode/darkmode.svelte';
	import Avatar from '../icon/avatar.svelte';
	import Deco from '../icon/deco.svelte';
	import NavA from '../nav/navA.svelte';
	import NavU from '../nav/navU.svelte';
	import NavV from '../nav/navV.svelte';
	import Logoh from './logoh.svelte';
	import Translate from './translate.svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
	let token: tokenType | null = readToken();
	let { data, isVisible = true } = $props();
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
	<div class=" flex flex-col items-center gap-5 p-4">
		<Darkmode />
		{#if isVisible}
			<Translate {data} />
		{/if}
	</div>
	<Menu class="{isDark.get() ? 'burgerDM' : 'burgerLM'} lg:hidden" />
</header>
