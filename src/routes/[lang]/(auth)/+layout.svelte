<script lang="ts">
	import Logo from '../../../components/logo.svelte';
	let { children } = $props();
</script>

<header class="mt-4 flex justify-center">
	<Logo />
</header>
{@render children()}
