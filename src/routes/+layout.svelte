<script>
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Mark Fayngersh</title>
	<meta name="description" content="The personal website of Mark Fayngersh" />
</svelte:head>

{@render children()}
