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
	import type { language } from '../../utils/translations/language';
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
		translation,
	}: {
		formData: any;
		isReloadNeeded: boolean;
		id: string;
		translation: (typeof language)['en'];
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
			<h1 class="text-center font-['Damion'] text-[40px]">{translation.event.titleModify}</h1>
			<CircleX
				class="absolute right-2 top-2"
				size="30px"
				onclick={() => {
					isOpen = !isOpen;
				}}
			/>
			<form
				onsubmit={submitHandler}
				class="mb-5 flex flex-col items-center gap-5 rounded border border-black bg-white !px-5 !py-5 xl:w-2/3"
			>
				<div class="gap-20 xl:flex">
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
				</div>
				<div class="gap-20 xl:flex">
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
				</div>
				<div class="gap-20 xl:flex">
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
				</div>
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
						<label class="GrandiFlora whitespace-nowrap text-xl" for="description">
							{translation.event.description}
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
						placeholder="{translation.event.description}..."
					></textarea>
					{#if errors['description']}<span class="text-center text-redError"
							>{errors['description']}</span
						>{/if}
				</div>
				<InputSubmit text={translation.event.modifyEvent} />
			</form>
		</div>
	</div>
{/if}
