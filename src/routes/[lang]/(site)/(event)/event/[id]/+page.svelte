<script lang="ts">
	import { requestGet } from '../../../../../../services/requestGet';
	import { handleError } from '../../../../../../utils/handleError';
	import type { eventType } from '../../../../../../utils/type';
	import { readToken } from '../../../../../../utils/token';
	import { requestPatch } from '../../../../../../services/requestPatch';
	import ButtonParticipate from '../../../../../../components/button/buttonParticipate.svelte';
	import { formatDate } from '../../../../../../utils/const';
	import { language, type langType } from '../../../../../../utils/translations/language';
	import ModalListParticipant from '../../../../../../components/modal/modalListParticipant.svelte';

	let { data }: { data: { lang: langType; id: string } } = $props();
	let translation = $state(language[data.lang]);
	let token = readToken();
	let isReloadNeeded = $state(false);
	$effect(() => {
		translation = language[data.lang];
	});
	let eventData: eventType | undefined = $state();
	let isParticipate: boolean = $state(false);
	let isCreator: boolean = $state(false);
	$effect(() => {
		isReloadNeeded;
		isReloadNeeded = false;
		requestGet(`evenement/${data.id}?id=${token.sub}`).then((res) => {
			console.log(res.response);
			handleError(res.status);
			eventData = res.response.data;
			isParticipate = res.response.isParticipate;
			isCreator = res.response.isCreator;
		});
	});
	function participate() {
		requestPatch(`user/participate/${data.id}`).then((res) => {
			isReloadNeeded = true;
		});
	}
</script>

<main class="Agdasima my-10 flex grow flex-col items-center gap-5 px-2.5 text-center text-[20px]">
	{#if eventData}
		<section>
			<h1 class="Damion text-[32px] md:text-5xl">{eventData.name}</h1>
			<h2 class="md:text-[32px]">
				{translation.welcome.category} : {eventData.category.name}
			</h2>
		</section>
		<article
			class="eventshadow mb-5 flex flex-col items-start rounded-[10px] border bg-white px-3.5 py-2.5"
		>
			<h3>{translation.event.description} :</h3>
			<div class="Agdasima mb-2.5 w-full rounded border bg-floralWhite px-5 py-2.5 text-xl">
				<p>
					{eventData.description}
				</p>
			</div>
			<div class="flex w-full flex-col gap-5 py-2.5">
				<section class="flex flex-wrap justify-between gap-y-5">
					<p>{translation.event.city} : {eventData.city}</p>
					<p>
						{translation.event.address} :
						{eventData.address}
					</p>
				</section>
				<section class="flex flex-wrap justify-between gap-y-5">
					<p class="pr-4">
						{translation.event.date} : {new Date(eventData.time).toLocaleString(
							data.lang,
							formatDate,
						)}
					</p>
					<p>
						{translation.event.participants} : {eventData._count
							.userParticipate}/{eventData.maxParticipants}
					</p>
				</section>
				<section class="flex flex-wrap justify-between gap-y-5">
					<p>{translation.event.price} : {eventData.price}€ /pers</p>
					<p>{eventData.user.userName}</p>
				</section>
			</div>
		</article>
		<div class="flex flex-col gap-2.5 md:flex-row md:gap-10">
			{#if isCreator}
				<ModalListParticipant data={eventData} {translation} bind:isReloadNeeded />
			{/if}
			<ButtonParticipate
				click={participate}
				text={isParticipate ? translation.event.unsubscribe : translation.event.subscribe}
			/>
		</div>
	{/if}
</main>
