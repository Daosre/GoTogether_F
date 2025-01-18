<script lang="ts">
	import { setContext } from 'svelte';
	import Header from '../../components/h.f/header.svelte';
	import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
	import { writable } from 'svelte/store';
	let { children } = $props();
	let isDark = persist(writable(true), createLocalStorage(), 'isDark');
	setContext('isDark', { get: () => $isDark, set: () => ($isDark = !$isDark) });
</script>

<Header />
{@render children()}
