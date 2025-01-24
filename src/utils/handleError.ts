import { goto } from '$app/navigation';
import { disconnect } from './token';

export function handleError(statusCode: number) {
	if (statusCode === 401) {
		disconnect();
	} else if (statusCode === 404 || statusCode === 500) {
		goto(`${statusCode}`);
	}
}
