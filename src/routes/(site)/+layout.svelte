<script lang="ts">
	import Header from '../../components/h.f/header.svelte';
	let { children } = $props();
</script>

<Header />
{@render children()}
