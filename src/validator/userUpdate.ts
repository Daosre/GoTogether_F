import * as yup from 'yup';
export const schemaSignupUpdate = yup.object({
	firstName: yup.string().required('Ce champ est requis'),
	lastName: yup.string().required('Ce champ est requis'),
	email: yup.string().required('Ce champ est requis').email('Email invalide'),
	userName: yup
		.string()
		.required('Ce champ est requis')
		.min(3, 'Doit contenir au moin 3 caractères'),
	phone: yup
		.string()
		.required('Ce champ est requis')
		.max(20, "Ce n'est pas un numéro valide")
		.min(10, "Ce n'est pas un numéro valide"),
});
