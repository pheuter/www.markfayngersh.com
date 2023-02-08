<div class="text-base antialiased">
	<slot />
</div>

<style lang="postcss">
	:global(body) {
		@apply min-h-[100dvh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900;
	}
</style>
