<script lang="ts">
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { requestPost } from '../../services/requestPost';
	import { extractErrors } from '../../utils/extractErrorsForm';
	import { language, type langType } from '../../utils/translations/language';
	import type { eventErrorType, eventFormType } from '../../utils/type';
	import { validValueForm } from '../../utils/validValueForm';
	import { schemaEvent } from '../../validator/event';
	import InputForm from '../input/InputForm.svelte';
	import InputSubmit from '../input/InputSubmit.svelte';
	import { handleError } from '../../utils/handleError';
	let isDark: { get: () => boolean } = getContext('isDark');
	let {
		formData = {
			name: '',
			categoryName: '',
			city: '',
			address: '',
			time: '',
			maxParticipants: null,
			price: 0,
			description: '',
		},
		data,
	}: { data: { lang: langType; url: string }; formData?: eventFormType } = $props();
	let translation = $state(language[data.lang]);
	$effect(() => {
		translation = language[data.lang];
	});
	let errors: eventErrorType = $state({});
	async function submitHandler() {
		try {
			await schemaEvent.validate(formData, { abortEarly: false });
			errors = {};
			formData.time = formData.time + ':00Z';
			requestPost('evenement/create', formData).then((res) => {
				handleError(res.status);
				if (res.status === 201) {
					goto('accueil');
				}
			});
		} catch (err: any) {
			errors = extractErrors(err);
		}
	}
</script>

<h1 class="font-['Damion'] {isDark.get() ? 'text-white' : ''} text-[40px]">
	{translation.event.titleForm}
</h1>
<form
	onsubmit={submitHandler}
	class="mb-5 flex flex-col items-center gap-5 rounded border border-black bg-white px-5 py-5 xl:w-1/4"
>
	<InputForm
		label={translation.event.title}
		placeholder="{translation.event.title}..."
		bind:value={formData}
		error={errors}
		name="name"
		schema={schemaEvent}
	/>

	<InputForm
		label={translation.event.category}
		placeholder="{translation.event.category}..."
		bind:value={formData}
		error={errors}
		name="categoryName"
		schema={schemaEvent}
	/>
	<InputForm
		label={translation.event.city}
		placeholder="{translation.event.city}..."
		bind:value={formData}
		error={errors}
		name="city"
		schema={schemaEvent}
	/>
	<InputForm
		label={translation.event.address}
		placeholder="{translation.event.address}..."
		bind:value={formData}
		error={errors}
		name="address"
		schema={schemaEvent}
	/>

	<InputForm
		label={translation.event.date}
		type="datetime-local"
		bind:value={formData}
		error={errors}
		name="time"
		schema={schemaEvent}
	/>
	<InputForm
		label={translation.event.participants}
		placeholder="20"
		type="number"
		bind:value={formData}
		error={errors}
		name="maxParticipants"
		schema={schemaEvent}
	/>
	<InputForm
		label={translation.event.price}
		placeholder={translation.event.price}
		type="number"
		bind:value={formData}
		error={errors}
		name="price"
		schema={schemaEvent}
	/>
	<div class="flex w-72 flex-col">
		<div class="flex items-center gap-2 px-2">
			<label class="GrandiFlora whitespace-nowrap text-xl" for="description"
				>{translation.event.description}</label
			>
			<hr class="relative top-1 w-full border-black" />
		</div>
		<textarea
			class="Agdasima flex h-12 min-h-12 justify-center rounded-xl text-center text-xl shadow-[inset_2px_-2px_2px_0_rgba(33,33,33,0.5),inset_-2px_2px_2px_0_rgba(33,33,33,0.5)] outline-none placeholder:text-black placeholder:opacity-20"
			name="descritpion"
			id="description"
			oninput={async (e) => {
				errors = await validValueForm(formData, 'description', errors, schemaEvent);
			}}
			bind:value={formData.description}
			placeholder="{translation.event.description}..."
		></textarea>
		{#if errors['description']}<span class="text-center text-redError">{errors['description']}</span
			>{/if}
	</div>
	<InputSubmit text={translation.event.validForm} />
</form>
