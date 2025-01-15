import * as yup from 'yup';
export const schemaSignup = yup.object({
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
	password: yup
		.string()
		.required('Ce champ est requis')
		.matches(/[a-z]/, "Nécessite d'une minuscule")
		.matches(/[A-Z]/, "Nécessite d'une majuscule")
		.matches(/[0-9]/, "Nécessite d'un nombre")
		.matches(/[@!?]/, 'Nécessite charactère spécial')
		.min(12, 'Minimum 12 character'),
	confirmPassword: yup
		.string()
		.required('Ce champ est requis')
		.test('', "Le mot de passe n'est pas identique", function (value) {
			return this.parent.password === value;
		}),
	checkbox: yup
		.boolean()
		.oneOf([true], 'You must accept the terms and conditions')
		.required('This field is required')
});
