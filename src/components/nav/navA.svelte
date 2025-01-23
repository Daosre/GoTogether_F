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
	<li>{translation.nav.welcome}</li>
	<li>{translation.nav.createEvent}</li>
	<li>{translation.nav.myEvents}</li>
	<li>{translation.nav.myParticipations}</li>
	<li>{translation.nav.eventList}</li>
	<li>{translation.nav.userList}</li>
</nav>
