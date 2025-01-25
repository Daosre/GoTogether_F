<script lang="ts">
	import { formatHM } from '../utils/const';
	import type { eventPropsType, eventType } from '../utils/type';
	import ButtonInformation from './button/buttonInformation.svelte';
	let { lang, data, translation }: eventPropsType = $props();
</script>

<div
	class="Agdasima eventshadow m-2 flex w-[256px] flex-col items-center gap-2.5 rounded-[10px] bg-white pb-5 pt-2.5 lg:w-[320px] lg:justify-center lg:text-[20px]"
>
	<h2 class="text-2xl lg:text-[30px]">{data.name}</h2>
	<h3 class="text-[20px] lg:text-[26px]">{translation.welcome.category} : {data.category.name}</h3>
	<p>{translation.welcome.location} : {data.city}</p>
	<p>{translation.welcome.date} : {new Date(data.time).toLocaleDateString()}</p>
	<p>
		{translation.welcome.time} : {new Date(data.time).toLocaleTimeString(lang, formatHM)}
	</p>
	<p>{translation.welcome.participant} : {data._count.userParticipate} / {data.maxParticipants}</p>
	<p>{translation.welcome.price} : {data.price === 0 ? 'Gratuit' : data.price + '€ / pers'}</p>
	<ButtonInformation text={translation.welcome.moreInformation} redirect={`event/${data.id}`} />
</div>
