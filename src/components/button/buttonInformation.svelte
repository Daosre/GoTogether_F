<script lang="ts">
	import { goto } from '$app/navigation';

	let { text = "Plus d'information", redirect } = $props();
</script>

<button
	onclick={() => goto(redirect)}
	class="Agdasima buttonshadow h-[30px] w-[200px] rounded-[20px] bg-orange text-[16px] lg:h-[34px] lg:w-[245px] lg:text-[20px] xl:duration-[0.3s] xl:hover:translate-y-1 xl:hover:bg-[#f68e52] xl:hover:text-white"
	>{text}
</button>
