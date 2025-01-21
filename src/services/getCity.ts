export async function getCity(nom: string) {
	const api = await fetch(`https://geo.api.gouv.fr/communes?nom=${nom}&limit=5`);
	const response = await api.json();
	return { response: response, status: api.status };
}
