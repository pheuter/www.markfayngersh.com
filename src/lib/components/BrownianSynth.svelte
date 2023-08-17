<script lang="ts">
	import { onMount } from 'svelte';

	interface Dot {
		x: number;
		y: number;
		dx: number;
		dy: number;
		color: string;
	}

	const numDots = 10;

	let audioContext: AudioContext;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationFrameId: number;
	let dots: Dot[] = [];
	let userHasClicked = false;

	onMount(() => {
		audioContext = new AudioContext();
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

	function generateImpulseResponse(duration: number, decay: number, reverse: boolean) {
		const sampleRate = audioContext.sampleRate;
		const length = sampleRate * duration;
		const impulse = audioContext.createBuffer(2, length, sampleRate);
		const impulseL = impulse.getChannelData(0);
		const impulseR = impulse.getChannelData(1);

		for (let i = 0; i < length; i++) {
			const n = reverse ? length - i : i;
			const value = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
			impulseL[i] = value;
			impulseR[i] = value;
		}

		return impulse;
	}

	function playSound() {
		if (!userHasClicked) {
			return;
		}

		const oscillator = audioContext.createOscillator();
		oscillator.type = 'sine';
		oscillator.frequency.setValueAtTime(Math.random() * 1000 + 100, audioContext.currentTime);

		const gainNode = audioContext.createGain();

		const attackTime = 0.1;
		const decayTime = 0.1;
		const sustainValue = 0.3;
		const releaseTime = 0.1;
		const now = audioContext.currentTime;

		// Attack
		gainNode.gain.setValueAtTime(0, now);
		gainNode.gain.linearRampToValueAtTime(1, now + attackTime);

		// Decay
		gainNode.gain.linearRampToValueAtTime(sustainValue, now + attackTime + decayTime);

		// Sustain
		const sustainDuration = 0.5;
		gainNode.gain.setValueAtTime(sustainValue, now + attackTime + decayTime + sustainDuration);

		// Release
		gainNode.gain.setTargetAtTime(0, now + attackTime + decayTime + sustainDuration, releaseTime);

		const convolverNode = audioContext.createConvolver();
		convolverNode.buffer = generateImpulseResponse(3, 2, false); // Change duration and decay values to adjust the reverb effect

		oscillator.connect(gainNode);
		gainNode.connect(convolverNode);
		convolverNode.connect(audioContext.destination);

		oscillator.start();
		oscillator.stop(now + attackTime + decayTime + sustainDuration + releaseTime);
	}

	function moveDot(dot: Dot) {
		dot.x += dot.dx;
		dot.y += dot.dy;

		if (dot.x < 0 || dot.x > canvas.width) {
			dot.dx = -dot.dx;
			playSound();
		}

		if (dot.y < 0 || dot.y > canvas.height) {
			dot.dy = -dot.dy;
			playSound();
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
</script>

<svelte:window on:click={() => (userHasClicked = true)} />

<canvas bind:this={canvas} class="fixed inset-0 z-10" />
