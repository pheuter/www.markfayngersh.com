<script>
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { data } = $props();

	const formatDate = (date) =>
		date.toLocaleDateString('en-US', {
			timeZone: 'UTC',
			dateStyle: 'medium'
		});
</script>

<div class="mx-auto max-w-prose px-4 py-8">
	<nav class="mb-8">
		<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
	</nav>

	<ul
		role="list"
		class="divide-y divide-zinc-200 overflow-hidden rounded-md bg-white shadow dark:divide-zinc-800 dark:border dark:border-zinc-800 dark:bg-transparent"
	>
		{#each data.posts as post}
			<li>
				<a
					href="/posts/{post.slug}"
					class="block px-6 py-4 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
				>
					<h2 class="text-xl font-semibold">{post.title}</h2>
					<time
						datetime={post.date.toISOString()}
						class="mt-2 block text-sm text-zinc-600 dark:text-zinc-400"
					>
						{formatDate(post.date)}
					</time>
				</a>
			</li>
		{/each}
	</ul>
</div>
