<script lang="ts">
	import { getContext } from 'svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
</script>

<nav
	class="Agdasima hidden w-1/2 list-none flex-wrap justify-center gap-6 gap-y-3 text-[24px] xl:flex {isDark.get()
		? 'text-white'
		: 'text-black'} duration-[1.5s]"
>
	<li>Accueil</li>
	<li>Crée un évènement</li>
	<li>Mes évènements</li>
	<li>Liste évènements</li>
	<li>Liste utilisateurs</li>
</nav>
