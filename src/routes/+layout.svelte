<script>
	import { page } from '$app/stores';
	import BrownianSynth from '$lib/components/BrownianSynth.svelte';
</script>

<div class="min-h-dvh bg-gray-50 text-base antialiased dark:bg-gray-950">
	<div class="relative z-20">
		<slot />
	</div>
	{#if !$page.url.pathname.startsWith('/posts')}
		<BrownianSynth />
	{/if}
</div>
