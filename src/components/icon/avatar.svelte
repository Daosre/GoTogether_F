<script lang="ts">
	import { User } from 'lucide-svelte';
	import { getContext } from 'svelte';
	let isDark: { get: () => boolean } = getContext('isDark');
</script>

<User class="avatar hidden cursor-pointer {isDark.get() ? 'text-white' : 'text-black'} duration-[1.5s] xl:block" />
