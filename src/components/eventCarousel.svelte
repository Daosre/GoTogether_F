<script lang="ts">
	import { formatHM } from '../utils/const';
	import type { eventPropsType } from '../utils/type';
	import ButtonInformation from './button/buttonInformation.svelte';
	let { lang, data, translation, index }: eventPropsType & { index: number } = $props();
</script>

<!-- Agdasima eventshadow m-2 flex flex-col items-center gap-2.5 rounded-[10px] bg-white px-5 pb-5 pt-2.5 lg:w-[320px] lg:justify-center lg:text-[20px] -->
<div
	id={`${index}`}
	class="Agdasima eventshadow m-2 inline-block shrink-0 snap-center rounded-[10px] bg-white px-5 pb-5 pt-2.5"
>
	<h2 class="my-[5px] text-2xl lg:text-[30px]">{data.name}</h2>
	<h3 class="my-[5px] text-[20px] lg:text-[26px]">
		{translation.welcome.category} : {data.category.name}
	</h3>
	<p class="my-[5px]">{translation.welcome.location} : {data.city}</p>
	<p class="my-[5px]">{translation.welcome.date} : {new Date(data.time).toLocaleDateString()}</p>
	<p class="my-[5px]">
		{translation.welcome.time} : {new Date(data.time).toLocaleTimeString(lang, formatHM)}
	</p>
	<p class="my-[5px]">
		{translation.welcome.participant} : {data._count.userParticipate} / {data.maxParticipants}
	</p>
	<p class="my-[5px]">
		{translation.welcome.price} : {data.price === 0 ? 'Gratuit' : data.price + '€ / pers'}
	</p>
	<ButtonInformation text={translation.welcome.moreInformation} />
</div>
