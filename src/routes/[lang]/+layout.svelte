<script lang="ts">
	import { setContext } from 'svelte';
	import Footer from '../../components/h.f/footer.svelte';
	import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
	import { writable } from 'svelte/store';
	import type { language } from '../../utils/translations/language';
	let { children, data } = $props();
	let lang = persist(writable(data.lang), createLocalStorage(), 'lang');
	setContext('lang', { get: () => $lang, set: (value: keyof typeof language) => ($lang = value) });
</script>

{@render children()}
<Footer />
