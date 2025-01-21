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
export type eventErrorType = {
	name?: string;
	categoryName?: string;
	city?: string;
	address?: string;
	time?: string;
	maxParticipants?: number;
	price?: number;
	description?: string;
};
export type getEventListResponseType = {
	countEvent: number;
	data: [eventType];
	isNextPage: boolean;
};
export type eventType = {
	id: string;
	user: { userName: string };
	address: string;
	category: {
		name: string;
	};
	city: string;
	createdAt: string;
	description: string;
	maxParticipants: number;
	name: string;
	price: number;
	time: string;
	_count: { userParticipate: number };
};
export type userType = {
	id: string;
	userName: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	isActive: boolean;
};
