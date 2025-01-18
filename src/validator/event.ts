import * as yup from 'yup';
export const schemaEvent = yup.object({
	name: yup
		.string()
		.required('Ce champ est requis !')
		.min(10, 'Minimum 10 caractères')
		.max(50, 'Maximum 50 caractères'),
    categoryName: yup.string().required
});
