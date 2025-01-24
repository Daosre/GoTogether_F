import type { validationError } from './type';

export function extractErrors(err: validationError) {
	console.log(err.inner);
	return err.inner.reduce((acc, err) => {
		return { ...acc, [err.path]: err.message };
	}, {});
}
