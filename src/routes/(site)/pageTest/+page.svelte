<script lang="ts">
	import InputForm from '../../../components/input/InputForm.svelte';
	import InputSubmit from '../../../components/input/InputSubmit.svelte';
	import { schemaEvent } from '../../../validator/event';
	import { validValueForm } from '../../../utils/validValueForm';
	import { requestPost } from '../../../services/requestPost';
	import { goto } from '$app/navigation';
	import { extractErrors } from '../../../utils/extractErrorsForm';
	import { date } from 'yup';
	import type { eventErrorType } from '../../../utils/type';
	import { disconnect } from '../../../utils/token';
	let formData = $state({
		name: '',
		categoryName: '',
		city: '',
		address: '',
		time: '',
		maxParticipants: null,
		price: 0,
		description: '',
	});
	let errors: eventErrorType = $state({});
	async function submitHandler() {
		try {
			await schemaEvent.validate(formData, { abortEarly: false });
			errors = {};
			formData.time = formData.time + ':00Z';
			requestPost('evenement/create', formData).then((res) => {
				console.log(res);
				if (res.status === 401) {
					disconnect();
				}
				if (res.status === 201) {
					goto('/accueil');
				}
			});
		} catch (err: any) {
			errors = extractErrors(err);
		}
	}
</script>

<main class="flex grow flex-col items-center justify-center gap-7 px-5 py-4">
	<h1 class="font-['Damion'] text-[40px]">Création d'évènement</h1>
	<form
		onsubmit={submitHandler}
		class="mb-5 flex flex-col items-center gap-5 rounded border border-black bg-white px-5 py-5 xl:w-1/4"
	>
		<InputForm
			label="Titre"
			placeholder="Titre..."
			bind:value={formData}
			error={errors}
			name="name"
			schema={schemaEvent}
		/>

		<InputForm
			label="Catégorie"
			placeholder="Catégorie..."
			bind:value={formData}
			error={errors}
			name="categoryName"
			schema={schemaEvent}
		/>
		<InputForm
			label="Ville"
			placeholder="Ville..."
			bind:value={formData}
			error={errors}
			name="city"
			schema={schemaEvent}
		/>
		<InputForm
			label="Adresse"
			placeholder="Adresse..."
			bind:value={formData}
			error={errors}
			name="address"
			schema={schemaEvent}
		/>

		<InputForm
			label="Date"
			type="datetime-local"
			bind:value={formData}
			error={errors}
			name="time"
			schema={schemaEvent}
		/>
		<InputForm
			label="Participant"
			placeholder="20"
			type="number"
			bind:value={formData}
			error={errors}
			name="maxParticipants"
			schema={schemaEvent}
		/>
		<InputForm
			label="Prix"
			placeholder="Prix"
			type="number"
			bind:value={formData}
			error={errors}
			name="price"
			schema={schemaEvent}
		/>
		<div class="flex w-72 flex-col">
			<div class="flex items-center gap-2 px-2">
				<label class="GrandiFlora whitespace-nowrap text-xl" for="description"> Description </label>
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
				placeholder="Description..."
			></textarea>
			{#if errors['description']}<span class="text-center text-redError"
					>{errors['description']}</span
				>{/if}
		</div>
		<InputSubmit text="Crée l'évènement" />
	</form>
</main>
