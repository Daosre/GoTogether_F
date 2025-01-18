<script lang="ts">
	import InputForm from '../../../components/input/InputForm.svelte';
	import type { signupErrorType, validationError } from '../../../utils/type';
	import InputSubmit from '../../../components/input/InputSubmit.svelte';
	import { goto } from '$app/navigation';
	import Logo from '../../../components/logo.svelte';
	import { schemaSignin } from '../../../validator/signin';
	import { requestPost } from '../../../services/requestPost';
	let formData = $state({
		identifiant: '',
		password: '',
	});
	let errors: signupErrorType = $state({});
	async function submitHandler() {
		try {
			await schemaSignin.validate(formData, { abortEarly: false });
			errors = {};
			requestPost('auth/signin', formData).then((res) => {
				if (res.status === 201 && typeof window !== undefined) {
					window.localStorage.setItem('token', res.response.connexion_token);
					goto('/accueil');
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
<main class="flex grow flex-col items-center justify-center gap-7 px-5 py-4">
	<h1 class="font-['Damion'] text-[40px]">Connexion</h1>
	<form
		onsubmit={submitHandler}
		class="mb-5 flex flex-col items-center gap-5 rounded border border-black bg-white px-5 py-5 xl:w-1/4"
	>
		<InputForm
			label="Identifiant"
			placeholder="Identifiant..."
			value={formData}
			error={errors}
			name="identifiant"
			schema={schemaSignin}
		/>

		<InputForm
			label="Mot de passe"
			placeholder="Mot de passe..."
			type="password"
			value={formData}
			error={errors}
			name="password"
			schema={schemaSignin}
		/>

		<InputSubmit text="Connexion" />
		<p>Pas encore inscrit ? <a href="signup" class="text-green">Rejoignez-nous .</a></p>
	</form>
</main>
