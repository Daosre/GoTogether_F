<script lang="ts">
	import { LogOut } from 'lucide-svelte';
	import { getContext } from 'svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
</script>

<LogOut
	class="logout hidden cursor-pointer {isDark.get()
		? 'text-white'
		: 'text-black'} duration-[1.5s] xl:block"
/>
