<script lang="ts">
	import Footer from '../../components/h.f/footer.svelte';
	let { children, data } = $props();
</script>

{@render children()}
<Footer lang={data.lang} />
