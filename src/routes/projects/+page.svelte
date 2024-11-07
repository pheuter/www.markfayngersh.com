<script>
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	const projects = [
		{
			title: 'HN Push',
			date: '2024-11-04',
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
				'HIPAA-compliant mobile app for caregivers that streamlines shift management and care documentation. Built with accessibility in mind, featuring adjustable text sizes and high contrast modes, the app enables caregivers to clock in/out and document care tasks even without internet connectivity.',
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
				'Global, resizable panel that enables home care agencies to manage their workspace with AI. Features include RAG-powered context awareness, function calling for data visualization, file upload analysis, and dynamic generation of custom charts and graphs based on agency data.',
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

<div class="mx-auto max-w-5xl px-4 py-8">
	<nav class="mb-8">
		<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
	</nav>
	<div class="space-y-20">
		{#each projects as project}
			<article class="relative flex flex-col gap-8 lg:flex-row">
				<div
					class="relative lg:w-[400px] {project.image.orientation === 'portrait'
						? 'aspect-[4/5]'
						: 'aspect-[16/9]'} lg:shrink-0"
				>
					<a
						href={project.url}
						class="group block h-full"
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Visit ${project.title}`}
					>
						<img
							src={project.image.src}
							alt={project.image.alt}
							class="absolute inset-0 h-full w-full rounded-2xl object-cover transition-opacity group-hover:opacity-90
							{project.image.objectPosition === 'left' ? 'object-left' : ''}
							{project.image.objectPosition === 'right' ? 'object-right' : ''}
							{project.image.objectPosition === 'top' ? 'object-top' : ''}
							{project.image.objectPosition === 'bottom' ? 'object-bottom' : ''}"
						/>
					</a>
				</div>
				<div class="relative">
					<div class="flex items-center gap-x-4 text-xs">
						<time datetime={project.date} class="text-zinc-500 dark:text-zinc-400">
							{new Date(project.date).toLocaleDateString('en-US', {
								timeZone: 'UTC',
								year: 'numeric',
								month: 'long'
							})}
						</time>
						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span
									class="rounded-full bg-zinc-100 px-3 py-1.5 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
					<div class="relative max-w-xl">
						<a href={project.url} class="group block" target="_blank" rel="noopener noreferrer">
							<h3
								class="mt-3 text-xl/6 font-semibold transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
							>
								{project.title}
							</h3>
						</a>
						<p class="mt-5 text-sm/6 text-zinc-600 dark:text-zinc-400">
							{project.description}
						</p>
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
