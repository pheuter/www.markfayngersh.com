export const load = async () => {
	const posts = import.meta.glob('./**/*.svx');

	const allPosts = await Promise.all(
		Object.entries(posts).map(async ([path, importFn]) => {
			const component = await importFn();
			const slug = path.match(/\.\/(.+)\/\+page\.svx/)?.[1] ?? '';

			return {
				title: component.metadata.title,
				date: new Date(component.metadata.date),
				slug
			};
		})
	);

	return {
		posts: allPosts.sort((a, b) => b.date.getTime() - a.date.getTime())
	};
};
