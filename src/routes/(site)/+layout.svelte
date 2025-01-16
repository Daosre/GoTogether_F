<script lang="ts">
	import { setContext } from 'svelte';
	import Header from '../../components/h.f/header.svelte';
	let { children } = $props();
	let isDark: boolean = $state(false);
	setContext('isDark', () => isDark);
</script>

<Header />
{@render children()}
