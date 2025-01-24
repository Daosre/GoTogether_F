import type { langType } from './translations/language';
import enFlag from '$lib/asset/Enflag.jpg';
import frFlage from '$lib/asset/franceflag.jpg';
export const formatDate: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
};
export const formatHM: Intl.DateTimeFormatOptions = {
	hour: '2-digit',
	minute: '2-digit',
};
export const listLanguage: langType[] = ['en', 'fr'];
export const enum Role {
	ADMIN = 'Admin',
	USER = 'User',
}
export const listFlag = { en: enFlag, fr: frFlage };
