<script>
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Mark Fayngersh</title>
	<meta name="description" content="The personal website of Mark Fayngersh" />
</svelte:head>

<div class="min-h-dvh bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
	{@render children()}
</div>
