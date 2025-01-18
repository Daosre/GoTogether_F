<script lang="ts">
	import { validValueForm } from '../../utils/validValueForm';

	let { label, name, value = $bindable(), placeholder, type = 'text', error, schema } = $props();
</script>

<div class="flex w-72 flex-col">
	<div class="flex items-center gap-2 px-2">
		<label class="GrandiFlora whitespace-nowrap text-xl" for={label}>
			{label}
		</label>
		<hr class="relative top-1 w-full border-black" />
	</div>
	<input
		class="Agdasima h-12 rounded-xl text-center text-xl shadow-[inset_2px_-2px_2px_0_rgba(33,33,33,0.5),inset_-2px_2px_2px_0_rgba(33,33,33,0.5)] outline-none placeholder:text-black placeholder:opacity-20"
		{name}
		{type}
		id={label}
		oninput={async (e) => {
			value[name] = (e.target as HTMLInputElement).value;
			error = await validValueForm(value, name, error, schema);
		}}
		value={value[name]}
		{placeholder}
	/>
	{#if error[name]}<span class="text-redError text-center">{error[name]}</span>{/if}
</div>
