export async function validValueForm(data: any, name: string, error: any, schema: any) {
	try {
		await schema.validateAt(name, { ...data, [name]: data[name] });
		return { ...error, [name]: '' };
	} catch (err: any) {
		return { ...error, [name]: err.message };
	}
}
