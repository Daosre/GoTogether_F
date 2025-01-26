import { goto } from '$app/navigation';

export function load({ params }: { params: any }) {
	const { id } = params;
	return { id };
}
