import { redirect } from '@sveltejs/kit';
import { listLanguage } from '../../utils/const';
import type { langType } from '../../utils/translations/language';

export function load({ params, url }: { params: { lang: langType }; url: { href: string } }) {
	const { lang } = params;
	const testParam: any = params.lang;
	if (!listLanguage.includes(testParam)) {
		const newUrl = url.href.replace(testParam, 'en');
		redirect(307, newUrl);
	}
	return { lang, url: url.href };
}
