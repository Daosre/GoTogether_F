<script lang="ts">
	import { Trash2Icon } from 'lucide-svelte';
	let { translation, action }: { translation: any; action: () => void } = $props();
	let isOpen = $state();
	let modalOut = $state(false);
</script>

<Trash2Icon class="m-auto cursor-pointer text-redError" onclick={() => (isOpen = true)} />
{#if isOpen}
	<div
		class="slideIn {modalOut
			? 'slideOut'
			: ''} fixed left-0 top-1/3 z-10 flex h-[150px] flex-col items-center justify-center !border-2 !border-[#212121] bg-[#FFF4E9] md:left-[200px] md:w-1/2 lg:w-2/3 xl:w-3/4"
	>
		<div class="Agdasima flex w-full flex-col items-center gap-2 !px-2 text-[#212121]">
			<h2 class="!whitespace-normal text-2xl">Voulez vous vraiment supprimer cette évènement ?</h2>
			<div class="flex w-full justify-center gap-10 text-[32px]">
				<button
					class="w-[100px] rounded-[20px] border-redError p-2 text-redError lg:duration-500 lg:hover:bg-redError lg:hover:text-white"
					onclick={() => {
						isOpen = false;
						action();
					}}>{translation.yes}</button
				>
				<button
					class="w-[100px] rounded-[20px] lg:duration-500 lg:hover:bg-[#221f1c] lg:hover:text-white"
					onclick={() => {
						isOpen = !isOpen;
					}}>{translation.no}</button
				>
			</div>
		</div>
	</div>
{/if}
