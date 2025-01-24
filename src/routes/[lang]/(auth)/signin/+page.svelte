<script lang="ts">
	import { goto } from '$app/navigation';
	import InputForm from '../../../../components/input/InputForm.svelte';
	import InputSubmit from '../../../../components/input/InputSubmit.svelte';
	import { requestPost } from '../../../../services/requestPost';
	import { extractErrors } from '../../../../utils/extractErrorsForm';
	import { handleError } from '../../../../utils/handleError';
	import { language } from '../../../../utils/translations/language';
	import type { signupErrorType } from '../../../../utils/type';
	import { schemaSignin } from '../../../../validator/signin';

	let formData = $state({
		identifiant: '',
		password: '',
	});
	let errors: signupErrorType = $state({});
	let { data } = $props();
	let translation = $state(language[data.lang]);
	$effect(() => {
		translation = language[data.lang];
	});
	async function submitHandler() {
		try {
			await schemaSignin.validate(formData, { abortEarly: false });
			errors = {};
			requestPost('auth/signin', formData).then((res) => {
				handleError(res.status);
				if (res.status === 201 && typeof window !== undefined) {
					window.localStorage.setItem('token', res.response.connexion_token);
					goto(`/${data}/accueil`);
				}
			});
		} catch (err: any) {
			errors = extractErrors(err);
		}
	}
</script>

<main class="flex grow flex-col items-center justify-center gap-7 px-5 py-4">
	<h1 class="font-['Damion'] text-[40px]">{translation.signin.connection}</h1>
	<form
		onsubmit={submitHandler}
		class="mb-5 flex flex-col items-center gap-5 rounded border border-black bg-white px-5 py-5 xl:w-1/4"
	>
		<InputForm
			label={translation.signin.identifier}
			placeholder="{translation.signin.identifier}..."
			bind:value={formData}
			error={errors}
			name="identifiant"
			schema={schemaSignin}
		/>

		<InputForm
			label={translation.signin.password}
			placeholder="{translation.signin.password}..."
			type="password"
			bind:value={formData}
			error={errors}
			name="password"
			schema={schemaSignin}
		/>

		<InputSubmit text={translation.signin.connection} />
		<p>
			{translation.signin.notRegistered}
			<a href="signup" class="text-green">{translation.signin.redirectSignUp}</a>
		</p>
	</form>
</main>
