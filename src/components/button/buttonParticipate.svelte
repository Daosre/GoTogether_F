<script lang="ts">
	let { text, click } = $props();
</script>

<button
	onclick={() => click()}
	class="Agdasima buttonshadow h-10 w-72 rounded-[20px] bg-orange lg:h-[34px] lg:w-[245px] lg:text-[20px]"
	>{text}</button
>
