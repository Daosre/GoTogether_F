<script lang="ts">
	import { goto } from '$app/navigation';
	import Translate from '../../../../components/h.f/translate.svelte';
	import InputForm from '../../../../components/input/InputForm.svelte';
	import InputSubmit from '../../../../components/input/InputSubmit.svelte';
	import { requestPost } from '../../../../services/requestPost';
	import { extractErrors } from '../../../../utils/extractErrorsForm';
	import { handleError } from '../../../../utils/handleError';
	import { language, type langType } from '../../../../utils/translations/language';
	import type { signupErrorType } from '../../../../utils/type';
	import { validValueForm } from '../../../../utils/validValueForm';
	import { schemaSignup } from '../../../../validator/signup';
	let formData = $state({
		userName: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
		checkbox: false,
	});
	let errors: signupErrorType = $state({});
	async function submitHandler() {
		try {
			await schemaSignup.validate(formData, { abortEarly: false });
			errors = {};
			requestPost('auth/signup', formData).then((res) => {
				handleError(res.status);
				if (res.status === 201) {
					goto('/signin');
				}
			});
		} catch (err: any) {
			errors = extractErrors(err);
		}
	}
	let { data } = $props();
	let translation = $state(language[data.lang]);
	$effect(() => {
		translation = language[data.lang];
	});
</script>

<main class="flex grow flex-col items-center gap-7 px-5 py-4">
	<h1 class="font-['Damion'] text-[40px]">{translation.signup.inscription}</h1>
	<form
		onsubmit={submitHandler}
		class="mb-5 flex flex-col items-center gap-5 rounded border border-[#212121] bg-[#FFF4E9] px-5 py-5 lg:px-20"
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
		<div class="flex flex-col gap-5 gap-x-32 lg:flex-row">
			<InputForm
				label={translation.signup.password}
				placeholder="{translation.signup.password}..."
				type="password"
				bind:value={formData}
				error={errors}
				name="password"
				schema={schemaSignup}
			/>
			<InputForm
				label={translation.signup.confirmPassword}
				placeholder="{translation.signup.password}..."
				type="password"
				bind:value={formData}
				error={errors}
				name="confirmPassword"
				schema={schemaSignup}
			/>
		</div>
		<div class="flex w-72 select-none items-center justify-center gap-6 px-2">
			<div class="h-4 w-4">
				<input
					id="checkbox"
					type="checkbox"
					class="checkbox"
					bind:checked={formData.checkbox}
					onclick={async () => {
						formData.checkbox = !formData.checkbox;
						errors = await validValueForm(formData, 'checkbox', errors, schemaSignup);
					}}
				/>
				<span class="checkmark"></span>
			</div>
			<label for="checkbox" class="Agdasima cursor-pointer text-center text-[#212121]"
				>{translation.signup.checkbox}</label
			>
		</div>
		{#if errors['checkbox']}
			<p class="text-center text-red-600">{errors['checkbox']}</p>
		{/if}
		<InputSubmit text="Inscription" />
		<p>
			{translation.signup.alreadyRegistered}
			<a href="signin" class="text-[#4E5C08]">
				{translation.signup.redirectLogIn}
			</a>
		</p>
	</form>
</main>
