<script lang="ts">
	import Breadcrumbs from './Breadcrumbs.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		date: string;
		children: Snippet;
	}

	let { title, date, children }: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="mx-auto max-w-prose px-4 py-8">
	<nav class="mb-8">
		<Breadcrumbs
			items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/posts' }, { label: title }]}
		/>
	</nav>
	<article class="prose prose-lg prose-zinc mx-auto dark:prose-invert prose-headings:font-semibold">
		<h1 class="mb-2">{title}</h1>
		<time datetime={date} class="text-sm">
			{new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC', dateStyle: 'medium' })}
		</time>
		<hr class="my-4" />
		{@render children()}
	</article>
</div>
