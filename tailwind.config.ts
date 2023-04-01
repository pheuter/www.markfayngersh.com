import { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import Typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [Typography]
} satisfies Config;
