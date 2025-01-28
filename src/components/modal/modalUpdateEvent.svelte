<script lang="ts">
	import { CircleX, PenLine } from 'lucide-svelte';
	import { extractErrors } from '../../utils/extractErrorsForm';
	import type { eventErrorType } from '../../utils/type';
	import { validValueForm } from '../../utils/validValueForm';
	import { schemaEvent } from '../../validator/event';
	import InputForm from '../input/InputForm.svelte';
	import InputSubmit from '../input/InputSubmit.svelte';
	import { requestPatch } from '../../services/requestPatch';
	import { handleError } from '../../utils/handleError';
	let {
		formData = $bindable({
			name: '',
			categoryName: '',
			city: '',
			address: '',
			time: '',
			maxParticipants: null,
			price: 0,
			description: '',
		}),
		isReloadNeeded = $bindable(),
		id,
	} = $props();
	let isOpen = $state(false);
	let errors: eventErrorType = $state({});
	async function submitHandler() {
		try {
			await schemaEvent.validate(formData, { abortEarly: false });
			errors = {};
			formData.time = formData.time + ':00Z';
			requestPatch(`evenement/update/${id}`, formData).then((res) => {
				handleError(res.status);
				if (res.status === 200) {
					isReloadNeeded = true;
					isOpen = false;
				}
			});
		} catch (err: any) {
			errors = extractErrors(err);
		}
	}
	let modalOut = $state(false);
</script>

<PenLine class=" m-auto cursor-pointer !border-none" onclick={() => (isOpen = true)} />
<div class={isOpen ? 'disableScroll' : ''}></div>
{#if isOpen}
	<div
		class="slideIn {modalOut
			? ''
			: ''} fixed left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center overflow-auto border-2 border-[#212121] bg-[#FFF4E9] md:w-full"
	>
		<div class="relative h-full w-full !py-7 xl:flex xl:flex-col xl:items-center">
			<h1 class="text-center font-['Damion'] text-[40px]">Création d'évènement</h1>
			<CircleX
				class="absolute right-2 top-2"
				size="30px"
				onclick={() => {
					isOpen = !isOpen;
				}}
			/>
			<form
				onsubmit={submitHandler}
				class="mb-5 flex flex-col items-center gap-5 rounded border border-black bg-white !px-5 !py-5 xl:w-2/3 xl:flex-row xl:flex-wrap xl:items-center xl:justify-center"
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
						<label class="GrandiFlora whitespace-nowrap text-xl" for="description">
							Description
						</label>
						<hr class="relative top-1 w-full border-black" />
					</div>
					<textarea
						class="Agdasima flex h-12 min-h-12 justify-center rounded-xl !p-2.5 text-center text-xl shadow-[inset_2px_-2px_2px_0_rgba(33,33,33,0.5),inset_-2px_2px_2px_0_rgba(33,33,33,0.5)] outline-none placeholder:text-black placeholder:opacity-20"
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
				<InputSubmit text="Modifier l'évènement" />
			</form>
		</div>
	</div>
{/if}
