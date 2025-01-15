import type { signupDataType } from '../utils/type';
import { PUBLIC_API_URL } from '$env/static/public';
import toast from 'svelte-french-toast';

export async function signup(data: signupDataType) {
	const req = {
		method: 'POST',
		headers: {
			'content-type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(data)
	};
	const api = await fetch(`${PUBLIC_API_URL}auth/signup`, req);
	const response = await api.json();
	if (response.statusCode) {
		console.log(response);
		if (typeof response.message === 'object') {
			response.message.map((text: string) => {
				toast.error(text);
			});
		} else {
			toast.error(response.message);
		}
	} else {
		toast.success(response.message);
	}
	return { response: response, status: api.status };
}
