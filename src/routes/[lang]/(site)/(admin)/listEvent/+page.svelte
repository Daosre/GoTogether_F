<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
	} from 'flowbite-svelte';
	import { PenLine, Trash2Icon } from 'lucide-svelte';
	import ModalValidate from '../../../../../components/modal/modalValidate.svelte';
	import Pagination from '../../../../../components/pagination.svelte';
	import SearchBar from '../../../../../components/searchBar/searchBar.svelte';
	import { requestDelete } from '../../../../../services/requestDelete';
	import { requestGet } from '../../../../../services/requestGet';
	import { formatDate } from '../../../../../utils/const';
	import { handleError } from '../../../../../utils/handleError';
	import { language } from '../../../../../utils/translations/language';
	import type { eventFormType, eventType } from '../../../../../utils/type';
	import ModalUpdate from '../../../../../components/modal/modalUpdateEvent.svelte';

	let page = $state(0);
	let search = $state('');
	let location = $state('');
	let response: { data?: eventType[]; isNextPage?: boolean } = $state({});
	let isReloadNeeded = $state(false);
	$effect(() => {
		search;
		page = 0;
	});
	$effect(() => {
		page;
		search;
		location;
		isReloadNeeded;
		isReloadNeeded = false;
		const delay = setTimeout(() => {
			requestGet(`evenement/search?page=${page}&search=${search}&location=${location}`).then(
				(res) => {
					handleError(res.status);
					if (res.status === 200) {
						response = res.response;
					}
				},
			);
		}, 500);
		return () => {
			clearTimeout(delay);
		};
	});
	let { data } = $props();
	let translation = $state(language[data.lang]);
	$effect(() => {
		translation = language[data.lang];
	});
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

<main class="flex grow flex-col gap-5 px-5 py-10 md:px-20">
	<div
		class="flex flex-col items-center gap-4 p-4 md:flex-row md:justify-center md:gap-6 lg:gap-20"
	>
		<SearchBar {data} bind:location bind:search />
	</div>
	<section class="overflow-auto">
		<Table class="borderTable text-center ">
			<TableHead class="bg-floralWhite ">
				<TableHeadCell>Créateur</TableHeadCell>
				<TableHeadCell>Nom de l'évènement</TableHeadCell>
				<TableHeadCell>Date de création</TableHeadCell>
				<TableHeadCell>Date de l'évènement</TableHeadCell>
				<TableHeadCell>Ville</TableHeadCell>
				<TableHeadCell>Prix</TableHeadCell>
				<TableHeadCell>Participants</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y" class="text-white">
				{#if response.data}
					{#each response.data as data}
						<TableBodyRow>
							<TableBodyCell>{data.user.userName}</TableBodyCell>
							<TableBodyCell>{data.name}</TableBodyCell>
							<TableBodyCell
								>{new Date(data.createdAt).toLocaleString('fr-FR', formatDate)}</TableBodyCell
							>
							<TableBodyCell
								>{new Date(data.time).toLocaleString('fr-FR', formatDate)}</TableBodyCell
							>
							<TableBodyCell>{data.city}</TableBodyCell>
							<TableBodyCell>{data.price === 0 ? 'gratuit' : data.price}</TableBodyCell>
							<TableBodyCell>{data._count.userParticipate}</TableBodyCell>
							<TableBodyCell class="notBorder"
								><ModalUpdate
									formData={{
										...data,
										categoryName: data.category.name,
										time: new Date(data.time).toISOString().slice(0, 16),
									}}
									bind:isReloadNeeded
									id={data.id}
								/></TableBodyCell
							>
							<TableBodyCell class="notBorder">
								<ModalValidate {translation} action={() => handleDelete(data.id)} />
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</Table>

		<Pagination isNextPage={response.isNextPage} bind:page />
	</section>
</main>
