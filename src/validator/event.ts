import * as yup from 'yup';
export const schemaEvent = yup.object({
	name: yup
		.string()
		.required('Ce champ est requis !')
		.min(3, 'Minimum 3 caractères')
		.max(50, 'Maximum 50 caractères'),
	categoryName: yup
		.string()
		.required('Ce champ est requis !')
		.min(4, 'Minimum 4 caractères')
		.max(50, 'Maximum 50 caractères'),
	city: yup.string().required('Ce champ est requis !').max(30, 'Maximum 30 caractères'),
	address: yup
		.string()
		.required('Ce champ est requis !')
		.min(3, 'Minimum 3 caractères')
		.max(255, 'Maximum 255 caractères'),
	time: yup.date().typeError('Veuillez entrer une date valide.').required('Ce champ est requis !'),
	maxParticipants: yup
		.number()
		.required('Ce champ est requis !')
		.min(2, 'Minimum 2 personnes')
		.max(999, 'Maximum 999'),
	price: yup
		.number()
		.required('Ce champ est requis !')
		.min(0, 'Minimum 0')
		.max(9999, 'Maximum 9999'),
	description: yup.string().required('Ce champ est requis !').max(500, 'Maximum 500 caractères'),
});
