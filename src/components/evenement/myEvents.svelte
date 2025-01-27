<script lang="ts">
	import { PenLine, Trash2Icon } from 'lucide-svelte';
	import { formatDate, formatHM } from '../../utils/const';
	import type { eventPropsType, eventType } from '../../utils/type';
	import ButtonInformation from '../button/buttonInformation.svelte';
	let { lang, data, translation }: eventPropsType = $props();
</script>

<article
	class="Agdasima eventshadow flex w-[256px] items-center justify-end gap-5 rounded-[10px] border bg-white px-5 pb-5 pt-2.5 lg:w-[320px] lg:text-[20px] xl:justify-center"
>
	<section class="flex flex-col gap-2.5">
		<h2 class="text-2xl lg:text-[30px]">{data.name}</h2>
		<h3 class="text-[20px] lg:text-[26px]">
			{translation.welcome.category} : {data.category.name}
		</h3>
		<p>{translation.welcome.location} : {data.city}</p>
		<p>{translation.welcome.date} : {new Date(data.time).toLocaleDateString(lang, formatDate)}</p>
	</section>
	<section class="flex flex-col gap-10">
		<PenLine />
		<Trash2Icon class="text-redError" />
	</section>
</article>
