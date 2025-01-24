<script lang="ts">
	import { CircleX } from 'lucide-svelte';
	import { language, type langType } from '../../utils/translations/language';

	let { data, isOpen = $bindable() }: { data: langType; isOpen: boolean } = $props();
	let translation = $state(language[data]);
	$effect(() => {
		translation = language[data];
	});
	let modalOut = $state(false);
</script>

<div class="slideIn {modalOut ? 'slideOut' : ''} fixed top-0 z-10 h-1/2 w-full">
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
			class="Agdasima flex h-full list-none flex-col items-center justify-center gap-10 text-[32px] text-[#212121]"
		>
			<li><a href="/{data}/accueil">{translation.nav.welcome}</a></li>
			<li><a href="/{data}/signup">{translation.nav.signUp}</a></li>
			<li><a href="/{data}/signin">{translation.nav.logIn}</a></li>
		</nav>
	</div>
</div>
