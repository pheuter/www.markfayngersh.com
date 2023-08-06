<script lang="ts">
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		arrow,
		offset,
		type Placement
	} from '@floating-ui/dom';
	import { onMount } from 'svelte';

	export let position: Placement = 'bottom-start';
	export let border = false;

	let contentEl: HTMLDivElement, tooltipEl: HTMLDivElement, arrowEl: HTMLDivElement;
	let tooltipX: number, tooltipY: number;
	let visible = false;

	async function updatePosition() {
		const { x, y, middlewareData, placement } = await computePosition(contentEl, tooltipEl, {
			placement: position,
			middleware: [offset(2), flip(), shift(), arrow({ element: arrowEl })]
		});

		tooltipX = x;
		tooltipY = y;

		const { x: arrowX, y: arrowY } = middlewareData.arrow!;
		const staticSide = {
			top: 'bottom',
			right: 'left',
			bottom: 'top',
			left: 'right'
		}[placement.split('-')[0]] as string;

		Object.assign(arrowEl.style, {
			left: arrowX != null ? `${arrowX}px` : '',
			top: arrowY != null ? `${arrowY}px` : '',
			right: '',
			bottom: '',
			[staticSide]: '-4px'
		});
	}

	onMount(() => {
		const cleanup = autoUpdate(contentEl, tooltipEl, updatePosition);
		return cleanup;
	});
</script>

<div
	role="tooltip"
	class="inline-block p-0.5 -m-0.5"
	on:mouseenter={() => (visible = true)}
	on:mouseleave={() => (visible = false)}
>
	<div class="border-dashed border-gray-400" class:border-b={border} bind:this={contentEl}>
		<slot />
	</div>

	<div
		class="z-10 bg-gray-200 p-2 rounded shadow-lg absolute w-max dark:bg-gray-800"
		class:hidden={!visible}
		style:left="{tooltipX}px"
		style:top="{tooltipY}px"
		bind:this={tooltipEl}
	>
		<p class="!m-0 max-w-sm text-sm text-gray-800 font-medium dark:text-gray-200">
			<slot name="tooltip" />
		</p>
		<div class="absolute bg-gray-200 w-2 h-2 rotate-45 dark:bg-gray-800" bind:this={arrowEl} />
	</div>
</div>
