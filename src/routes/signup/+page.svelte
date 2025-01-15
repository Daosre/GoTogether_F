<script lang="ts">
	import { goto } from '$app/navigation';
	import InputForm from '../../components/input/InputForm.svelte';
	import InputSubmit from '../../components/input/InputSubmit.svelte';
	import { requestPost } from '../../services/requestPost';
	import Logo from '../../components/logo.svelte';
	import Footer from '../../components/footer.svelte';
	import type { signupErrorType, validationError } from '../../utils/type';
	import { validValueForm } from '../../utils/validValueForm';
	import { schemaSignup } from '../../validator/signup';
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
	function extractErrors(err: validationError) {
		return err.inner.reduce((acc, err) => {
			return { ...acc, [err.path]: err.message };
		}, {});
	}
</script>

<header class="mt-4 flex justify-center">
	<Logo />
</header>
<main class="flex min-h-screen flex-col items-center gap-7 px-5 py-4">
	<h1 class="font-['Damion'] text-[40px]">Inscription</h1>
	<form
		onsubmit={submitHandler}
		class="mb-5 flex flex-col items-center gap-5 rounded border border-[#212121] bg-[#FFF4E9] px-5 py-5"
	>
		<InputForm
			label="Identifiant"
			placeholder="Identifiant..."
			value={formData}
			error={errors}
			name="userName"
			schema={schemaSignup}
		/>
		<InputForm
			label="Nom"
			name="lastName"
			placeholder="Nom..."
			value={formData}
			error={errors}
			schema={schemaSignup}
		/>
		<InputForm
			label="Prénom"
			placeholder="Prénom..."
			value={formData}
			error={errors}
			name="firstName"
			schema={schemaSignup}
		/>
		<InputForm
			label="Téléphone"
			placeholder="N° +33 25 26 54 58..."
			value={formData}
			error={errors}
			name="phone"
			schema={schemaSignup}
		/>
		<InputForm
			label="Email"
			placeholder="Email..."
			type="email"
			value={formData}
			error={errors}
			name="email"
			schema={schemaSignup}
		/>
		<InputForm
			label="Mot de passe"
			placeholder="Mot de passe..."
			type="password"
			value={formData}
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
		<div class="flex w-72 select-none items-center justify-center gap-6 px-2">
			<div class="h-4 w-4">
				<input
					id="checkbox"
					type="checkbox"
					class="checkbox"
					onclick={async () => {
						formData.checkbox = !formData.checkbox;
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
		<p>Déjà inscrit ? Cliquez <a href="signin" class="text-[#4E5C08]">ici.</a></p>
	</form>
</main>
<footer class="!bg-black">
	<Footer />
</footer>
