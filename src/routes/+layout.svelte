<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { Toaster } from 'svelte-french-toast';
	import { writable } from 'svelte/store';
	import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
	import { setContext } from 'svelte';
	let isDark = persist(writable(true), createLocalStorage(), 'isDark');
	setContext('isDark', { get: () => $isDark, set: () => ($isDark = !$isDark) });
</script>

<Toaster toastOptions={{ duration: 5000 }} />
{@render children()}
