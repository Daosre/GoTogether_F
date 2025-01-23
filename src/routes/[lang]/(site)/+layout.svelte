<script lang="ts">
	import Header from '../../../components/h.f/header.svelte';
	let { children, data } = $props();
</script>

<Header {data} />
{@render children()}
