<script lang="ts">
	import { LogOut } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { disconnect } from '../../utils/token';
	let isDark: { get: () => boolean } = getContext('isDark');
	let { lang } = $props();
</script>

<LogOut
	onclick={() => {
		disconnect(lang);
	}}
	class="logout hidden cursor-pointer {isDark.get()
		? 'text-white'
		: 'text-black'} duration-[1.5s] xl:block"
/>
