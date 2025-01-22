<script lang="ts">
	let { errorCode, textError } = $props();
</script>

<main class="Damion flex grow flex-col justify-center px-5 text-center text-[32px]">
	<h1 class="Damion text-[64px] font-bold">{errorCode}</h1>
	<h2 class="Agdasima text-wrap text-[32px] font-bold">
		{textError}
	</h2>
</main>
