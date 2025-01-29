<script lang="ts">
	import { formatDate } from '../../utils/const';
	import type { eventPropsType } from '../../utils/type';
	import ModalUpdate from '../modal/modalUpdateEvent.svelte';
	import ModalValidate from '../modal/modalValidate.svelte';
	import { requestDelete } from '../../services/requestDelete';
	import { handleError } from '../../utils/handleError';
	import type { language } from '../../utils/translations/language';
	let {
		lang,
		data,
		translation,
		isReloadNeeded = $bindable(),
		page = $bindable(),
	}: eventPropsType & {
		isReloadNeeded: boolean;
		page: number;
		translation: (typeof language)['en'];
	} = $props();
	function handleDelete(id: string) {
		requestDelete(`evenement/delete/${id}`).then((res) => {
			handleError(res.status);
			if (res.status === 200) {
				isReloadNeeded = true;
				page = 0;
			}
		});
	}
</script>

<div class="flex flex-nowrap items-center justify-end gap-2 rounded-[10px] border bg-white px-2.5">
	<article
		class="Agdasima eventshadow w-[200px] gap-5 pb-5 pt-2.5 lg:w-[320px] lg:text-[20px] xl:justify-center"
	>
		<section class="flex flex-col gap-2.5">
			<h2 class="text-2xl lg:text-[30px]">{data.name}</h2>
			<h3 class="text-[20px] lg:text-[26px]">
				{translation.welcome.category} : {data.category.name}
			</h3>
			<p>{translation.welcome.location} : {data.city}</p>
			<p>{translation.welcome.date} : {new Date(data.time).toLocaleDateString(lang, formatDate)}</p>
		</section>
	</article>
	<section class="flex flex-col gap-10">
		<ModalUpdate
			formData={{
				...data,
				categoryName: data.category.name,
				time: new Date(data.time).toISOString().slice(0, 16),
			}}
			bind:isReloadNeeded
			id={data.id}
			{translation}
		/>
		<ModalValidate {translation} action={() => handleDelete(data.id)} />
	</section>
</div>
