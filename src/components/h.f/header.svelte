<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { Role } from '../../utils/const';
	import { readToken } from '../../utils/token';
	import type { tokenType } from '../../utils/type';
	import Darkmode from '../darkMode/darkmode.svelte';
	import Avatar from '../icon/avatar.svelte';
	import Deco from '../icon/deco.svelte';
	import ModalA from '../modal/modalA.svelte';
	import ModalU from '../modal/modalU.svelte';
	import NavA from '../nav/navA.svelte';
	import NavU from '../nav/navU.svelte';
	import NavV from '../nav/navV.svelte';
	import Logoh from './logoh.svelte';
	import Translate from './translate.svelte';
	import ModalV from '../modal/modalV.svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
	let token: tokenType | null = readToken();
	let { data } = $props();
	let isOpen = $state(false);
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
		<Translate {data} />
	</div>
	{#if isOpen}
		{#if token?.role === Role.ADMIN}
			<ModalA data={data.lang} bind:isOpen />
		{:else if token?.role === Role.USER}
			<ModalU data={data.lang} bind:isOpen />
		{:else}
			<ModalV data={data.lang} bind:isOpen />
		{/if}
	{/if}

	<Menu
		class="{isDark.get() ? 'burgerDM' : 'burgerLM'} xl:hidden"
		onclick={() => {
			isOpen = !isOpen;
		}}
	/>
</header>
