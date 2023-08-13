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
	class="-m-0.5 inline-block p-0.5"
	on:mouseenter={() => (visible = true)}
	on:mouseleave={() => (visible = false)}
>
	<div class="border-dashed border-slate-400" class:border-b={border} bind:this={contentEl}>
		<slot />
	</div>

	<div
		class="absolute z-10 w-max rounded bg-slate-200 p-2 shadow-md dark:bg-slate-800"
		class:hidden={!visible}
		style:left="{tooltipX}px"
		style:top="{tooltipY}px"
		bind:this={tooltipEl}
	>
		<p class="!m-0 max-w-sm text-sm font-medium text-slate-700 dark:text-slate-200">
			<slot name="tooltip" />
		</p>
		<div class="absolute h-2 w-2 rotate-45 bg-slate-200 dark:bg-slate-800" bind:this={arrowEl} />
	</div>
</div>
