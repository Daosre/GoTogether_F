<script lang="ts">
	import TextError from '../../../../components/textError.svelte';
	let {data} = $props()
	console.log(data)
	
</script>

<TextError errorCode="500" textError="Nous rencontrons actuellement un problème avec le serveur" />
