import { PUBLIC_API_URL } from '$env/static/public';
import toast from 'svelte-french-toast';

export async function requestGet(pathName: string) {
	const req = {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${window.localStorage.getItem('token')}`,
		},
	};
	const api = await fetch(`${PUBLIC_API_URL}${pathName}`, req);
	const response = await api.json();
	if (response.statusCode) {
		if (typeof response.message === 'object') {
			response.message.map((text: string) => {
				toast.error(text);
			});
		} else {
			toast.error(response.message);
		}
	}
	return { response: response, status: api.status };
}
