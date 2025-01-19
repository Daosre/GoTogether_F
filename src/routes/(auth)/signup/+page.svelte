<script lang="ts">
	import { goto } from '$app/navigation';
	import InputForm from '../../../components/input/InputForm.svelte';
	import InputSubmit from '../../../components/input/InputSubmit.svelte';
	import { requestPost } from '../../../services/requestPost';
	import { extractErrors } from '../../../utils/extractErrorsForm';
	import type { signupErrorType, validationError } from '../../../utils/type';
	import { validValueForm } from '../../../utils/validValueForm';
	import { schemaSignup } from '../../../validator/signup';

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
				if (res.status === 201) {
					goto('/signin');
				}
			});
		} catch (err: any) {
			errors = extractErrors(err);
		}
	}
</script>

<main class="flex grow flex-col items-center gap-7 px-5 py-4">
	<h1 class="font-['Damion'] text-[40px]">Inscription</h1>
	<form
		onsubmit={submitHandler}
		class="mb-5 flex flex-col items-center gap-5 rounded border border-[#212121] bg-[#FFF4E9] px-5 py-5 lg:px-20"
	>
		<InputForm
			label="Identifiant"
			placeholder="Identifiant..."
			bind:value={formData}
			error={errors}
			name="userName"
			schema={schemaSignup}
		/>
		<div class="flex flex-col gap-5 gap-x-32 lg:flex-row">
			<InputForm
				label="Nom"
				name="lastName"
				placeholder="Nom..."
				bind:value={formData}
				error={errors}
				schema={schemaSignup}
			/>
			<InputForm
				label="Prénom"
				placeholder="Prénom..."
				bind:value={formData}
				error={errors}
				name="firstName"
				schema={schemaSignup}
			/>
		</div>
		<div class="flex flex-col gap-5 gap-x-32 lg:flex-row">
			<InputForm
				label="Téléphone"
				placeholder="N° +33 25 26 54 58..."
				bind:value={formData}
				error={errors}
				name="phone"
				schema={schemaSignup}
			/>
			<InputForm
				label="Email"
				placeholder="Email..."
				type="email"
				bind:value={formData}
				error={errors}
				name="email"
				schema={schemaSignup}
			/>
		</div>
		<div class="flex flex-col gap-5 gap-x-32 lg:flex-row">
			<InputForm
				label="Mot de passe"
				placeholder="Mot de passe..."
				type="password"
				bind:value={formData}
				error={errors}
				name="password"
				schema={schemaSignup}
			/>
			<InputForm
				label="Confirmation"
				placeholder="Mot de passe..."
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
						errors = await validValueForm(formData, 'checkbox', errors, schemaSignup);
					}}
				/>
				<span class="checkmark"></span>
			</div>
			<label for="checkbox" class="Agdasima cursor-pointer text-center text-[#212121]"
				>J’accepte les termes et conditions <br />d’utilisation</label
			>
		</div>
		{#if errors['checkbox']}
			<p class="text-center text-red-600">{errors['checkbox']}</p>
		{/if}
		<InputSubmit text="Inscription" />
		<p>Déjà inscrit ? <a href="signin" class="text-[#4E5C08]">Connecter-vous .</a></p>
	</form>
</main>
