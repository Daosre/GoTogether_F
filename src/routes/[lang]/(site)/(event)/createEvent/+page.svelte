<script lang="ts">
	import EventForm from '../../../../../components/evenement/eventForm.svelte';

	let { data } = $props();
	console.log(data);
</script>

<main class="flex grow flex-col items-center justify-center gap-7 px-5 py-4">
	<EventForm {data} />
</main>
