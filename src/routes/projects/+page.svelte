<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	const projects = [
		{
			title: 'Parerga',
			date: '2024-11-18',
			tags: ['AI', 'Archive', 'Notes'],
			description:
				'A curated archive showcasing meaningful human-AI conversations, documenting interactions that demonstrate AI capabilities, limitations, and unexpected dimensions.',
			image: {
				src: '/img/parerga_screenshot.png',
				alt: 'Parerga screenshot',
				orientation: 'landscape',
				objectPosition: 'top'
			},
			url: 'https://parerga.app'
		},
		{
			title: 'HN Push',
			date: '2024-10-29',
			tags: ['PWA', 'Svelte', 'Redis'],
			description:
				'Real-time Hacker News notification system built with SvelteKit that uses Web Push API and a cron job to monitor trending stories.',
			image: {
				src: '/img/hnpush_screenshot.jpeg',
				alt: 'HN Push screenshot',
				orientation: 'landscape'
			},
			url: 'https://hnpush.com'
		},
		{
			title: 'Svelte Data Table',
			date: '2024-07-13',
			tags: ['Svelte'],
			description:
				'Small, fast data table library for Svelte 5 with client-side sorting, filtering, and pagination.',
			image: {
				src: '/img/svelte_datatable_screenshot.png',
				alt: 'Svelte Data Table screenshot',
				orientation: 'landscape',
				objectPosition: 'left'
			},
			url: 'https://careswitch-svelte-data-table.vercel.app'
		},
		{
			title: 'Careswitch App',
			date: '2024-03-01',
			tags: ['iOS', 'SwiftUI'],
			description:
				'A user-friendly, HIPAA-compliant mobile app that streamlines shift management and care documentation for caregivers. Designed with accessibility in mind, it features adjustable text sizes and high-contrast modes, allowing caregivers to clock in/out and document care tasks even without internet connectivity.',
			image: {
				src: '/img/careswitch_ios_screenshot.jpeg',
				alt: 'Careswitch iOS App screenshot',
				orientation: 'portrait',
				objectPosition: 'top'
			},
			url: 'https://www.careswitch.com/caregiver-management#mobile-apps'
		},
		{
			title: 'Careswitch AI Assistant',
			date: '2023-08-01',
			tags: ['Svelte', 'GPT-4', 'shadcn/ui'],
			description:
				'An AI-powered, resizable panel that empowers home care agencies to manage their workspace efficiently. Features include context-aware assistance powered by RAG, function calling for real-time data retrieval and updates, comprehensive file upload analysis, and dynamic generation of custom charts and graphs.',
			image: {
				src: '/img/careswitch_assistant_screenshot.png',
				alt: 'Careswitch AI Assistant screenshot',
				orientation: 'landscape',
				objectPosition: 'right'
			},
			url: 'https://www.careswitch.com/ai-assistant'
		}
	];
</script>

<div class="mx-auto max-w-5xl px-4 py-8 md:px-8">
	<nav class="mb-8">
		<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
	</nav>
	<div class="space-y-20">
		{#each projects as project}
			<article class="group relative flex flex-col gap-8 lg:flex-row">
				<div
					class="relative lg:w-[400px] {project.image.orientation === 'portrait'
						? 'aspect-[4/5]'
						: 'aspect-[16/9]'} lg:shrink-0"
				>
					<a
						href={project.url}
						class="block h-full"
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Visit ${project.title}`}
					>
						<img
							src={project.image.src}
							alt={project.image.alt}
							class="border-yin-1/60 dark:border-yin-8/60 absolute inset-0 h-full w-full rounded-2xl border object-cover transition-opacity group-hover:opacity-90
							{project.image.objectPosition === 'left' ? 'object-left' : ''}
							{project.image.objectPosition === 'right' ? 'object-right' : ''}
							{project.image.objectPosition === 'top' ? 'object-top' : ''}
							{project.image.objectPosition === 'bottom' ? 'object-bottom' : ''}"
						/>
					</a>
				</div>
				<div class="relative">
					<div class="flex items-center gap-x-4 text-xs">
						<time datetime={project.date}>
							{new Date(project.date).toLocaleDateString('en-US', {
								timeZone: 'UTC',
								year: 'numeric',
								month: 'long'
							})}
						</time>
						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span class="bg-yin-1/40 dark:bg-yin-9 rounded-full px-3 py-1.5 font-medium">
									{tag}
								</span>
							{/each}
						</div>
					</div>
					<div class="relative max-w-xl">
						<a href={project.url} class="block" target="_blank" rel="noopener noreferrer">
							<h3
								class="group-hover:text-yin-7 dark:group-hover:text-yin-2 mt-3 font-serif text-3xl/6 font-semibold transition-colors"
							>
								{project.title}
							</h3>
						</a>
						<p class="text-yin-9 dark:text-yang mt-5">
							{project.description}
						</p>
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
