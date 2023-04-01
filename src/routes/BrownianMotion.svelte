<script lang="ts">
	import { onMount } from 'svelte';

	interface Dot {
		x: number;
		y: number;
		dx: number;
		dy: number;
		color: string;
	}

	const numDots = 200;

	let innerWidth: number, innerHeight: number;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationFrameId: number;
	let dots: Dot[] = [];

	onMount(() => {
		const context = canvas.getContext('2d');

		if (!context) {
			throw new Error('Failed to get 2D context for canvas');
		}

		ctx = context;
		canvas.width = innerWidth;
		canvas.height = innerHeight;

		// Create initial dots
		dots = createDots();

		// Start the animation
		animationFrameId = requestAnimationFrame(draw);
	});

	function randomColor() {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return `rgba(${r}, ${g}, ${b}, 0.5)`;
	}

	function createDots() {
		const dots = [];
		for (let i = 0; i < numDots; i++) {
			dots.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				dx: (Math.random() - 0.5) * 2,
				dy: (Math.random() - 0.5) * 2,
				color: randomColor()
			});
		}
		return dots;
	}

	function drawDot(dot: Dot) {
		ctx.beginPath();
		ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2, false);
		ctx.fillStyle = dot.color;
		ctx.fill();
	}

	function moveDot(dot: Dot) {
		dot.x += dot.dx;
		dot.y += dot.dy;

		if (dot.x < 0 || dot.x > canvas.width) {
			dot.dx = -dot.dx;
		}

		if (dot.y < 0 || dot.y > canvas.height) {
			dot.dy = -dot.dy;
		}
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (const dot of dots) {
			drawDot(dot);
			moveDot(dot);
		}

		animationFrameId = requestAnimationFrame(draw);
	}

	$: {
		if (canvas) {
			canvas.width = innerWidth;
			canvas.height = innerHeight;
		}
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<canvas bind:this={canvas} class="fixed inset-0 z-10" />
