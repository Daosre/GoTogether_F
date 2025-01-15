import * as yup from 'yup';
export const schemaSignin = yup.object({
	identifiant: yup.string().required('Ce champ est requis !'),
	password: yup.string().required('Ce champ est requis !'),
});
