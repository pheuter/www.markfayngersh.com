export const load = () => {
	const posts = import.meta.glob('./**/*.svx', { eager: true });

	const allPosts = Object.entries(posts).map(([path, module]) => {
		const slug = path.match(/\.\/(.+)\/\+page\.svx/)?.[1] ?? '';
		const { title, date } = module.metadata;

		return { title, date: new Date(date), slug };
	});

	return {
		posts: allPosts.sort((a, b) => b.date.getTime() - a.date.getTime())
	};
};
