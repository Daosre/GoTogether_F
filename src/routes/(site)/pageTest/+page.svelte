<script>
	import { CalendarClock } from 'lucide-svelte';
	import InputForm from '../../../components/input/InputForm.svelte';
	import InputSubmit from '../../../components/input/InputSubmit.svelte';
	import { schemaEvent } from '../../../validator/event';
	let formData = $state({
		name: '',
		categoryName: '',
		city: '',
		address: '',
		time: '',
		maxParticipants: null,
		price: null,
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
			label="Titre"
			placeholder="Titre..."
			value={formData}
			error={errors}
			name="name"
			schema={schemaEvent}
		/>

		<InputForm
			label="Catégorie"
			placeholder="Catégorie..."
			value={formData}
			error={errors}
			name="categoryName"
			schema={schemaEvent}
		/>
		<InputForm
			label="Ville"
			placeholder="Ville..."
			value={formData}
			error={errors}
			name="city"
			schema={schemaEvent}
		/>
		<InputForm
			label="Adresse"
			placeholder="Adresse..."
			value={formData}
			error={errors}
			name="address"
			schema={schemaEvent}
		/>

		<InputForm
			label="Date"
			type="datetime-local"
			value={formData}
			error={errors}
			name="time"
			schema={schemaEvent}
		/>
		<!-- <input
			id="test"
			type="datetime-local"
			class="Agdasima flex h-12 w-full appearance-none justify-center rounded-xl text-center text-xl shadow-[inset_2px_-2px_2px_0_rgba(33,33,33,0.5),inset_-2px_2px_2px_0_rgba(33,33,33,0.5)] outline-none placeholder:text-black placeholder:opacity-20"
		/>
		<label for="test">
			<CalendarClock class=" bottom-[13px] right-2.5" />
		</label> -->
		<InputForm
			label="Participant"
			placeholder="20"
			type="number"
			value={formData}
			error={errors}
			name="maxParticipants"
			schema={schemaEvent}
		/>

		<InputSubmit text="Crée l'évènement" />
		<p>Pas encore inscrit ? <a href="signup" class="text-green">Rejoignez-nous .</a></p>
	</form>
</main>
<!-- onsubmit={submitHandler} -->
