<script>
	import BrownianSynth from './BrownianSynth.svelte';
</script>

<div class="min-h-[100dvh] bg-gray-950 text-base antialiased">
	<div class="relative z-20">
		<slot />
	</div>
	<BrownianSynth />
</div>
