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
		class="prose prose-lg
		       prose-p:text-yin-9 dark:prose-p:text-yang
		       prose-headings:font-semibold prose-headings:text-yin-9 dark:prose-headings:text-yang
		       prose-ul:text-yin-9 dark:prose-ul:text-yang
		       prose-li:text-yin-9 dark:prose-li:text-yang
		       prose-ol:text-yin-9 dark:prose-ol:text-yang
		       prose-strong:text-yin-9 dark:prose-strong:text-yang
		       prose-a:text-blue-5 dark:prose-a:text-blue-4
		       mx-auto max-w-3xl"
	>
		<header>
			<h1 class="mb-2 font-serif">{title}</h1>
			<time datetime={new Date(date).toISOString()} class="text-yin-6 dark:text-yin-4 text-sm">
				{formatDate(date)}
			</time>
			<hr class="border-yin-2 dark:border-yin-8 !my-4" />
		</header>

		{@render children()}
	</article>
</div>
