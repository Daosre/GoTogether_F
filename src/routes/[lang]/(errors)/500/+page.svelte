<script lang="ts">
	import TextError from '../../../../components/textError.svelte';
	let {data} = $props()
</script>

<TextError errorCode="500" textError="Nous rencontrons actuellement un problème avec le serveur" />
