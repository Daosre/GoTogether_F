<script>
	import InputForm from '../../../components/input/InputForm.svelte';
	import InputSubmit from '../../../components/input/InputSubmit.svelte';
	import { schemaEvent } from '../../../validator/event';
	let formData = $state({
		name: '',
		categoryName: '',
		city: '',
		address: '',
		time: '',
		maxParticipants: 0,
		price: 0,
		description: '',
	});
	let errors = $state({});
</script>

<main class="flex grow flex-col items-center justify-center gap-7 px-5 py-4">
	<h1 class="font-['Damion'] text-[40px]">Création d'évènement</h1>
	<form
		class="mb-5 flex flex-col items-center gap-5 rounded border border-black bg-white px-5 py-5 xl:w-1/4"
	>
		<InputForm
			label="Identifiant"
			placeholder="Identifiant..."
			value={formData}
			error={errors}
			name="identifiant"
			schema={schemaEvent}
		/>

		<InputForm
			label="Mot de passe"
			placeholder="Mot de passe..."
			type="password"
			value={formData}
			error={errors}
			name="password"
			schema={schemaEvent}
		/>

		<InputSubmit text="Crée l'évènement" />
		<p>Pas encore inscrit ? <a href="signup" class="text-green">Rejoignez-nous .</a></p>
	</form>
</main>
<!-- onsubmit={submitHandler} -->
