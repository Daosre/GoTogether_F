<script lang="ts">
	import InputForm from '../../components/input/InputForm.svelte';
	import type { signupErrorType, validationError } from '../../utils/type';
	import InputSubmit from '../../components/input/InputSubmit.svelte';
	import { goto } from '$app/navigation';
	import Logo from '../../components/logo.svelte';
	import Footer from '../../components/footer.svelte';
	import { schemaSignin } from '../../validator/signin';
	import { requestPost } from '../../services/requestPost';
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
				if (res.status === 201) {
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
<main class="flex min-h-screen grow flex-col items-center justify-center gap-7 px-5 py-4">
	<h1 class="font-['Damion'] text-[40px]">Connexion</h1>
	<form
		onsubmit={submitHandler}
		class="mb-5 flex flex-col items-center gap-5 rounded border border-[#212121] bg-[#FFF4E9] px-5 py-5"
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
		<p>Pas encore inscrit ? Cliquez <a href="signup" class="text-[#4E5C08]">ici.</a></p>
	</form>
</main>
<Footer />
