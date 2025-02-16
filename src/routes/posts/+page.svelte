<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { data } = $props();

	const formatDate = (date: Date) =>
		date.toLocaleDateString('en-US', {
			timeZone: 'UTC',
			dateStyle: 'medium'
		});
</script>

<div class="mx-auto max-w-3xl px-4 py-8 md:px-8">
	<nav class="mb-8">
		<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
	</nav>

	<ul
		role="list"
		class="divide-y divide-stone-200 overflow-hidden rounded-md bg-white shadow dark:divide-stone-800 dark:border dark:border-stone-800 dark:bg-transparent"
	>
		{#each data.posts as post}
			<li>
				<a
					href="/posts/{post.slug}"
					class="block px-6 py-4 transition-colors hover:bg-stone-100 dark:hover:bg-stone-900"
				>
					<h2 class="text-lg font-bold">{post.title}</h2>
					<time
						datetime={post.date.toISOString()}
						class="mt-2 block text-stone-600 dark:text-stone-400"
					>
						{formatDate(post.date)}
					</time>
				</a>
			</li>
		{/each}
	</ul>
</div>
