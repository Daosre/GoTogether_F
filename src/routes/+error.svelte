<script lang="ts">
	import { page } from '$app/state';
	import Footer from '../components/h.f/footer.svelte';
	import Header from '../components/h.f/header.svelte';
</script>

<Header />
<main class="Damion flex grow flex-col justify-center px-5 text-center text-[32px]">
	<h1 class="Damion text-[64px] font-bold">{page.status}</h1>
	<h2 class="Agdasima text-wrap text-[32px] font-bold">
		{#if page.status === 404}
			La page est introuvable
		{:else if page.status === 500}
			Nous rencontrons un problème avec le serveur
		{/if}
	</h2>
</main>
<Footer />
