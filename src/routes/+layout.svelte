<script>
	import BrownianMotion from './BrownianMotion.svelte';
</script>

<div class="min-h-[100dvh] bg-gray-950 text-base antialiased">
	<div class="relative z-20">
		<slot />
	</div>
	<BrownianMotion />
</div>
