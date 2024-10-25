import { mdsvex } from 'mdsvex';
import remarkFootnotes from 'remark-footnotes';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			layout: './src/lib/components/BlogLayout.svelte',
			remarkPlugins: [remarkFootnotes]
		})
	],

	kit: {
		adapter: adapter({ runtime: 'nodejs20.x' })
	},

	extensions: ['.svelte', '.svx']
};

export default config;
