import type { validationError } from './type';

export function extractErrors(err: validationError) {
	return err.inner.reduce((acc, err) => {
		return { ...acc, [err.path]: err.message };
	}, {});
}
