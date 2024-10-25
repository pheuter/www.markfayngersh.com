<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { data } = $props();
</script>

<div class="mx-auto max-w-prose px-4 py-8">
	<nav class="mb-8">
		<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
	</nav>
	<div
		class="overflow-hidden rounded-md bg-white shadow dark:border dark:border-zinc-800 dark:bg-transparent"
	>
		<ul role="list" class="divide-y divide-zinc-200 dark:divide-zinc-800">
			{#each data.posts as post}
				<a href="/posts/{post.slug}" class="block">
					<li class="px-6 py-4 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900">
						<h2 class="text-xl font-semibold">{post.title}</h2>
						<p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
							{post.date.toLocaleDateString('en-US', { timeZone: 'UTC', dateStyle: 'medium' })}
						</p>
					</li>
				</a>
			{/each}
		</ul>
	</div>
</div>
