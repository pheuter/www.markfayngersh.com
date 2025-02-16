<script lang="ts">
	import type { Snippet } from 'svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';

	interface Props {
		title: string;
		date: string;
		children: Snippet;
	}

	let { title, date, children }: Props = $props();

	const formatDate = (date: string) =>
		new Date(date).toLocaleDateString('en-US', {
			timeZone: 'UTC',
			dateStyle: 'medium'
		});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8 md:px-8">
	<nav class="mb-8">
		<Breadcrumbs
			items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/posts' }, { label: title }]}
		/>
	</nav>

	<article
		class="prose prose-lg prose-stone dark:prose-invert prose-headings:font-semibold mx-auto max-w-3xl"
	>
		<header>
			<h1 class="mb-2 font-serif">{title}</h1>
			<time datetime={new Date(date).toISOString()} class="text-sm">
				{formatDate(date)}
			</time>
			<hr class="!my-4" />
		</header>

		{@render children()}
	</article>
</div>
