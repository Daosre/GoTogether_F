<script lang="ts">
	import Header from '../../components/h.f/header.svelte';
	let { isDark = $bindable() } = $props();
</script>

<Header bind:isDark />
