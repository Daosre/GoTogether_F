<script lang="ts">
	import { getContext } from 'svelte';
	import { language, type langType } from '../../utils/translations/language';
	let isDark: { get: () => boolean } = getContext('isDark');
	let { data }: { data: langType } = $props();
	let translation = $state(language[data]);
	$effect(() => {
		translation = language[data];
	});
</script>

<nav
	class="Agdasima hidden w-1/2 list-none flex-wrap justify-center gap-6 gap-y-3 text-[24px] xl:flex {isDark.get()
		? 'text-white'
		: 'text-black'} duration-[1.5s]"
>
	<li><a href="/{data}/accueil" class="anime">{translation.nav.welcome}</a></li>
	<li><a href="/{data}/createEvent" class="anime">{translation.nav.createEvent}</a></li>
	<li><a href="/{data}/accueil" class="anime">{translation.nav.myEvents}</a></li>
	<li><a href="/{data}/accueil" class="anime">{translation.nav.myParticipations}</a></li>
	<li><a href="/{data}/listEvent" class="anime">{translation.nav.eventList}</a></li>
	<li><a href="/{data}/listUser" class="anime">{translation.nav.userList}</a></li>
</nav>
