<script lang="ts">
	import { CircleX } from 'lucide-svelte';
	import { language, type langType } from '../../utils/translations/language';

	let { data, isOpen = $bindable() }: { data: langType; isOpen: boolean } = $props();
	let translation = $state(language[data]);
	$effect(() => {
		translation = language[data];
	});
	let modalOut = $state(false);
	function transitionOutModal() {
		modalOut = true;
		setTimeout(() => {
			isOpen = !isOpen;
		}, 3000);
	}
</script>

<div
	class="slideIn {modalOut ? 'slideOut' : ''} fixed top-0 z-10 h-2/3 w-full duration-300 ease-in"
>
	<div class="relative z-10 h-full w-full border-2 border-black bg-[#FFF4E9]">
		<CircleX
			class="absolute left-2 top-2"
			onclick={() => {
				modalOut = true;
				setTimeout(() => {
					isOpen = !isOpen;
				}, 2000);
			}}
		/>
		<nav
			class="Agdasima flex h-full list-none flex-col items-center justify-center gap-2 text-[32px] text-[#212121]"
		>
			<li>
				<a
					href="/{data}/accueil"
					onclick={() => {
						transitionOutModal();
					}}>{translation.nav.welcome}</a
				>
			</li>
			<li>
				<a
					href="/{data}/createEvent"
					onclick={() => {
						transitionOutModal();
					}}>{translation.nav.createEvent}</a
				>
			</li>
			<li>
				<a
					href="/{data}/myEvents"
					onclick={() => {
						transitionOutModal();
					}}>{translation.nav.myEvents}</a
				>
			</li>
			<li>
				<a
					href="/{data}/myParticipations"
					onclick={() => {
						transitionOutModal();
					}}>{translation.nav.myParticipations}</a
				>
			</li>
			<li>
				<a
					href="/{data}/accueil"
					onclick={() => {
						transitionOutModal();
					}}>{translation.nav.welcome}</a
				>
			</li>
		</nav>
	</div>
</div>
