<script lang="ts">
	interface Props {
		items: { label: string; href?: string }[];
	}

	let { items }: Props = $props();
</script>

<ol class="flex items-center space-x-2 text-sm text-stone-600 dark:text-stone-400">
	{#each items as item, i}
		<li>
			{#if item.href}
				<a href={item.href} class="hover:text-stone-900 dark:hover:text-stone-200">{item.label}</a>
			{:else}
				<span class="font-medium text-stone-900 dark:text-stone-200">{item.label}</span>
			{/if}
		</li>

		{#if i < items.length - 1}
			<li>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="size-4"
				>
					<path
						fill-rule="evenodd"
						d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
					/>
				</svg>
			</li>
		{/if}
	{/each}
</ol>
