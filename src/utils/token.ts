import { goto } from '$app/navigation';

export function readToken() {
	if (typeof window !== 'undefined') {
		const token = window.localStorage.getItem('token') || '';
		const arrayToken = token.split('.');
		try {
			return JSON.parse(atob(arrayToken[1]));
		} catch (err) {
			return undefined;
		}
	}
}

export function disconnect() {
	if (typeof window !== 'undefined') {
		window.localStorage.removeItem('token');
		goto('/signin');
	}
}
