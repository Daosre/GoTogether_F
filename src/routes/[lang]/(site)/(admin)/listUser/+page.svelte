<script lang="ts">
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Table,
	} from 'flowbite-svelte';
	import type { userType } from '../../../../../utils/type';
	import { requestGet } from '../../../../../services/requestGet';
	import { handleError } from '../../../../../utils/handleError';
	import { requestDelete } from '../../../../../services/requestDelete';
	import Search from '../../../../../components/searchBar/search.svelte';
	import Pagination from '../../../../../components/pagination.svelte';
	import ModalValidate from '../../../../../components/modal/modalValidate.svelte';
	import { language } from '../../../../../utils/translations/language';
	import ModalUpdateUser from '../../../../../components/modal/modalUpdateUser.svelte';
	import { getContext } from 'svelte';
	let isDark: { get: () => boolean } = getContext('isDark');

	let page = $state(0);
	let search = $state('');
	let response: { data?: userType[]; isNextPage?: boolean } = $state({});
	let isReloadNeeded = $state(false);
	$effect(() => {
		search;
		page = 0;
	});
	$effect(() => {
		page;
		search;
		isReloadNeeded;
		isReloadNeeded = false;
		const delay = setTimeout(() => {
			requestGet(`user/List?page=${page}&search=${search}`).then((res) => {
				handleError(res.status);
				if (res.status === 200) {
					response = res.response;
				}
			});
		}, 500);
		return () => {
			clearTimeout(delay);
		};
	});
	function handleDelete(id: string) {
		requestDelete(`user/${id}`).then((res) => {
			handleError(res.status);
			if (res.status === 200) {
				isReloadNeeded = true;
				page = 0;
			}
		});
	}
	let { data } = $props();
	let translation = $state(language[data.lang]);
	$effect(() => {
		translation = language[data.lang];
	});
</script>

<main class="flex grow flex-col gap-5 px-5 py-10 md:px-20 {isDark.get() ? 'darkmode' : 'lightmode'}">
	<div
		class="flex flex-col items-center gap-4 p-4 md:flex-row md:justify-center md:gap-6 lg:gap-20"
	>
		<Search data={data.lang} bind:search />
	</div>
	<section class="overflow-auto">
		<Table class="borderTable text-center ">
			<TableHead class="bg-floralWhite ">
				<TableHeadCell>Nom</TableHeadCell>
				<TableHeadCell>Prénom</TableHeadCell>
				<TableHeadCell>Nom d'utilisateur</TableHeadCell>
				<TableHeadCell>Email</TableHeadCell>
				<TableHeadCell>Téléphone</TableHeadCell>
				<TableHeadCell>Activer</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y" class="text-white">
				{#if response.data}
					{#each response.data as data}
						<TableBodyRow>
							<TableBodyCell>{data.lastName}</TableBodyCell>
							<TableBodyCell>{data.firstName}</TableBodyCell>
							<TableBodyCell>{data.userName}</TableBodyCell>
							<TableBodyCell>{data.email}</TableBodyCell>
							<TableBodyCell class="!whitespace-nowrap">{data.phone}</TableBodyCell>
							<TableBodyCell>{data.isActive}</TableBodyCell>
							<TableBodyCell
								class="notBorder"
								onclick={() => {
									console.log(data);
								}}
								><ModalUpdateUser
									{translation}
									formData={data}
									bind:isReloadNeeded
									id={data.id}
								/></TableBodyCell
							>
							<TableBodyCell class="notBorder"
								><ModalValidate {translation} action={() => handleDelete(data.id)} /></TableBodyCell
							>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
		<Pagination isNextPage={response.isNextPage} bind:page />
	</section>
</main>
