<script lang="ts">
	import { CircleX } from 'lucide-svelte';
	import { requestGet } from '../../services/requestGet';
	import ModalValidate from './modalValidate.svelte';
	import { requestDelete } from '../../services/requestDelete';
	import { handleError } from '../../utils/handleError';
	let { data, translation, isReloadNeeded = $bindable() } = $props();
	let isOpen = $state(false);
	let participants: { user: { userName: string }; userId: string }[] = $state([]);
	let modalOut = $state(false);
	function listParticipant() {
		requestGet(`user/participantList/${data.id}`).then((res) => {
			console.log(res);
			participants = res.response.data;
		});
	}
	function removeParticipant(userId: string) {
		requestDelete(`user/event/${data.id}/user/${userId}`).then((res) => {
			handleError(res.status);
			isReloadNeeded = true;
		});
	}
	$effect(() => {
		isReloadNeeded;
		if (isReloadNeeded) {
			listParticipant();
			isReloadNeeded = false;
		}
	});
</script>

<button
	onclick={() => {
		isOpen = true;
		listParticipant();
	}}>List des participants</button
>
<div class={isOpen ? 'disableScroll' : ''}></div>
{#if isOpen}
	<div
		class="slideIn {modalOut
			? ''
			: ''} fixed left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center overflow-auto border-2 border-[#212121] bg-[#FFF4E9] md:w-full"
	>
		<div class="relative h-full w-full !py-7 xl:flex xl:flex-col xl:items-center">
			<h1 class="text-center font-['Damion'] text-[40px]">Liste des participants</h1>
			<CircleX
				class="absolute right-2 top-2"
				size="30px"
				onclick={() => {
					isOpen = !isOpen;
				}}
			/>
			<ul class="flex flex-col items-center justify-center gap-2.5">
				{#if participants.length > 0}
					{#each participants as participant}
						<li class="flex gap-5 text-[20px]">
							{participant.user.userName}
							{#if participant.user.userName !== data.user.userName}
								<ModalValidate
									{translation}
									action={() => {
										removeParticipant(participant.userId);
									}}
								/>
							{/if}
						</li>
					{/each}
				{:else}
					<h1 class="text-5xl">Aucun utilisateur inscrit !</h1>
				{/if}

				<li></li>
			</ul>
		</div>
	</div>
{/if}
