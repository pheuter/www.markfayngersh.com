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
		class="divide-yin-1 dark:divide-yin-8 dark:border-yin-8 divide-y overflow-hidden rounded-md bg-[white] shadow dark:border dark:bg-transparent"
	>
		{#each data.posts as post}
			<li>
				<a
					href="/posts/{post.slug}"
					class="hover:bg-yin-1/20 dark:hover:bg-yin-9 block px-6 py-4 transition-colors"
				>
					<h2 class="text-lg">{post.title}</h2>
					<time datetime={post.date.toISOString()} class="text-yin-6 dark:text-yin-4 mt-2 block">
						{formatDate(post.date)}
					</time>
				</a>
			</li>
		{/each}
	</ul>
</div>
