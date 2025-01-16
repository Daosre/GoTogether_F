<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { Toaster } from 'svelte-french-toast';
	import Footer from '../components/h.f/footer.svelte';
</script>

<Toaster toastOptions={{ duration: 5000 }} />
{@render children()}
<Footer/>
