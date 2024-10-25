export const load = async () => {
	interface Post {
		title: string;
		date: Date;
		slug: string;
	}

	const posts = import.meta.glob<{
		metadata: {
			title: string;
			date: string;
		};
	}>('./**/*.svx');

	const allPosts: Post[] = [];

	for (const [path, importFn] of Object.entries(posts)) {
		const component = await importFn();
		const slug = path.match(/\.\/(.+)\/\+page\.svx/)?.[1] || '';

		allPosts.push({
			title: component.metadata.title,
			date: new Date(component.metadata.date),
			slug
		});
	}

	allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

	return { posts: allPosts };
};
