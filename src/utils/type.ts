export type signupDataType = {
	firstName: string;
	lastName: string;
	email: string;
	userName: string;
	phone: string;
	password: string;
};
export type validationError = {
	inner: { path: string; message: string }[];
};
export type signupErrorType = {
	firstName?: string;
	lastName?: string;
	email?: string;
	userName?: string;
	phone?: string;
	password?: string;
	confirmPassword?: string;
	checkbox?: boolean;
};
