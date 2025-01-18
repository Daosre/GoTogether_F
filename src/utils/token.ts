export function readToken() {
	if (typeof window !== 'undefined') {
		const token = window.localStorage.getItem('token') || '';
		const arrayToken = token.split('.');
		try {
			return JSON.parse(atob(arrayToken[1]));
		} catch (err) {
			return null;
		}
	}
}

export function removeToken() {
	if (typeof window !== 'undefined') {
		window.localStorage.removeItem('token');
	}
}
