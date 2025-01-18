import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				green: '#4E5C08',
				black: '#212121',
				white: '#FFF4E9',
				redError: '#DC2626',
				orange: '#F18046',
				floralWhite: '#FCF8F4',
				gray: '#787880',
				gray10: '#78788010',
			},
		},
	},

	plugins: [typography, forms, containerQueries],
} satisfies Config;
