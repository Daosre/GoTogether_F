import type { langType } from './translations/language';

export const formatDate: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
};
export const listLanguage: langType[] = ['en', 'fr'];
