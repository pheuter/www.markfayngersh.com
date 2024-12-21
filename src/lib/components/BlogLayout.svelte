<script>
	import Breadcrumbs from './Breadcrumbs.svelte';

	let { title, date, children } = $props();

	const formatDate = (date) =>
		new Date(date).toLocaleDateString('en-US', {
			timeZone: 'UTC',
			dateStyle: 'medium'
		});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-8 py-8">
	<nav class="mb-8">
		<Breadcrumbs
			items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/posts' }, { label: title }]}
		/>
	</nav>

	<article class="prose prose-lg prose-zinc dark:prose-invert prose-headings:font-semibold mx-auto">
		<header>
			<h1 class="mb-2">{title}</h1>
			<time datetime={new Date(date).toISOString()} class="text-sm">
				{formatDate(date)}
			</time>
			<hr class="!my-4" />
		</header>

		{@render children()}
	</article>
</div>
