<script lang="ts">
	import { getContext } from 'svelte';
	import EventForm from '../../../../../components/evenement/eventForm.svelte';
	let isDark: { get: () => boolean } = getContext('isDark');

	let { data } = $props();
</script>

<main
	class="flex grow flex-col items-center justify-center gap-7 px-5 py-4 {isDark.get()
		? 'darkmode'
		: 'lightmode'}"
>
	<EventForm {data} />
</main>
