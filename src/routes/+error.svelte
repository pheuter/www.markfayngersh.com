<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="max-w-prose px-4 py-10 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl border border-red-600 p-3 dark:border-red-500">
		<h1 class="font-serif text-3xl text-red-600 dark:text-red-500">
			Error: {$page.error?.message}
		</h1>
	</div>
</div>
