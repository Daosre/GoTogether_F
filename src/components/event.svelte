<script lang="ts">
	import type { eventType } from '../utils/type';
	import ButtonInformation from './button/buttonInformation.svelte';
	let { data }: { data: eventType } = $props();
	console.log(data);
</script>

<div
	class="Agdasima eventshadow m-2 flex h-[272px] w-[256px] flex-col items-center gap-2.5 rounded-[10px] bg-white lg:h-[320px] lg:w-[320px] lg:justify-center lg:text-[20px]"
>
	<h2 class="text-[24px] lg:text-[30px]">{data.name}</h2>
	<h3 class="text-[20px] lg:text-[26px]">Catégorie : {data.category.name}</h3>
	<p>Lieu : {data.city}</p>
	<p>Date : {new Date(data.time).toLocaleDateString()}</p>
	<p>
		Horaires : {new Date(data.time).toLocaleTimeString('ch', {
			hour: '2-digit',
			minute: '2-digit',
		})}
	</p>
	<p>Participant : 12 / 24</p>
	<p>Prix : 6€ / pers</p>
	<ButtonInformation />
</div>
