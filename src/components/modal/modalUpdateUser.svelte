<script lang="ts">
	import { CircleX, PenLine } from 'lucide-svelte';
	import { extractErrors } from '../../utils/extractErrorsForm';
	import type { eventErrorType } from '../../utils/type';
	import InputForm from '../input/InputForm.svelte';
	import InputSubmit from '../input/InputSubmit.svelte';
	import { requestPatch } from '../../services/requestPatch';
	import { handleError } from '../../utils/handleError';
	import { schemaSignup } from '../../validator/signup';
	import { schemaSignupUpdate } from '../../validator/userUpdate';
	import type { langType, language } from '../../utils/translations/language';
	let {
		formData = $bindable({
			userName: '',
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
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
			await schemaSignupUpdate.validate(formData, { abortEarly: false });
			errors = {};
			formData.time = formData.time + ':00Z';
			requestPatch(`user/${id}`, formData).then((res) => {
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
			<h1 class="text-center font-['Damion'] text-[40px]">{translation.user.titleModify}</h1>
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
					label={translation.signup.identifier}
					placeholder="{translation.signup.identifier}..."
					bind:value={formData}
					error={errors}
					name="userName"
					schema={schemaSignup}
				/>
				<div class="flex flex-col gap-5 gap-x-32 lg:flex-row">
					<InputForm
						label={translation.signup.lastName}
						name="lastName"
						placeholder="{translation.signup.lastName}..."
						bind:value={formData}
						error={errors}
						schema={schemaSignup}
					/>
					<InputForm
						label={translation.signup.firstName}
						placeholder="{translation.signup.firstName}..."
						bind:value={formData}
						error={errors}
						name="firstName"
						schema={schemaSignup}
					/>
				</div>
				<div class="flex flex-col gap-5 gap-x-32 lg:flex-row">
					<InputForm
						label={translation.signup.phone}
						placeholder="N° +33 25 26 54 58..."
						bind:value={formData}
						error={errors}
						name="phone"
						schema={schemaSignup}
					/>
					<InputForm
						label={translation.signup.email}
						placeholder="{translation.signup.email}..."
						type="email"
						bind:value={formData}
						error={errors}
						name="email"
						schema={schemaSignup}
					/>
				</div>
				<InputSubmit text={translation.user.modifyUser} />
			</form>
		</div>
	</div>
{/if}
