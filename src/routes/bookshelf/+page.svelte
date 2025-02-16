<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	const books = [
		{
			title: 'Christian Atheism',
			author: 'Slavoj Žižek',
			coverImage:
				'https://books.google.com/books/content?id=wBb_EAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
			url: 'https://books.google.com/books?id=wBb_EAAAQBAJ'
		},
		{
			title: 'SPQR',
			author: 'Mary Beard',
			coverImage:
				'https://books.google.com/books/content?id=yKL4CQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
			url: 'https://books.google.com/books?id=yKL4CQAAQBAJ'
		},
		{
			title: 'The Beach',
			author: 'Alex Garland',
			coverImage:
				'https://books.google.com/books/content?id=Gq1PEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
			url: 'https://books.google.com/books?id=Gq1PEAAAQBAJ'
		},
		{
			title: 'The Savior Generals',
			author: 'Victor Davis Hanson',
			coverImage:
				'https://books.google.com/books/content?id=h0lxAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
			url: 'https://books.google.com/books?id=h0lxAwAAQBAJ'
		},
		{
			title: 'Nexus',
			author: 'Yuval Noah Harari',
			coverImage:
				'https://books.google.com/books/content?id=n4rvEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
			url: 'https://books.google.com/books?id=n4rvEAAAQBAJ'
		},
		{
			title: 'Indigenous Continent',
			author: 'Pekka Hämäläinen',
			coverImage:
				'https://books.google.com/books/content?id=yYiQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
			url: 'https://books.google.com/books?id=yYiQEAAAQBAJ'
		},
		{
			title: "Wittgenstein's Mistress",
			author: 'David Markson',
			coverImage:
				'https://books.google.com/books/content?id=aitaEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=aitaEAAAQBAJ'
		},
		{
			title: 'The Vital Question',
			author: 'Nick Lane',
			coverImage:
				'https://books.google.com/books/content?id=KE6lMAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
			url: 'https://books.google.com/books?id=KE6lMAEACAAJ'
		},
		{
			title: 'Van Gogh: The Life',
			author: 'Steven Naifeh and Gregory White Smith',
			coverImage:
				'https://books.google.com/books/content?id=HcYE8mZxDhoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=HcYE8mZxDhoC'
		},
		{
			title: 'Magnificent Rebels',
			author: 'Andrea Wulf',
			coverImage:
				'https://books.google.com/books/content?id=iPW2EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=iPW2EAAAQBAJ'
		},
		{
			title: 'The Metamorphosis of Prime Intellect',
			author: 'Roger Williams',
			coverImage:
				'https://books.google.com/books/content?id=JgccBdnUHT8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=JgccBdnUHT8C'
		},
		{
			title: 'To 2040',
			author: 'Jorie Graham',
			coverImage:
				'https://books.google.com/books/content?id=PZi4EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=PZi4EAAAQBAJ'
		},
		{
			title: 'Midlife',
			author: 'Kieran Setiya',
			coverImage:
				'https://books.google.com/books/content?id=fvSnDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=fvSnDgAAQBAJ'
		},
		{
			title: 'Blitzed',
			author: 'Norman Ohler',
			coverImage:
				'https://books.google.com/books/content?id=YN2pDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=YN2pDAAAQBAJ'
		},
		{
			title: 'Trust',
			author: 'Hernan Diaz',
			coverImage:
				'https://books.google.com/books/content?id=QyiwEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=QyiwEAAAQBAJ'
		},
		{
			title: 'Surplus Enjoyment',
			author: 'Slavoj Žižek',
			coverImage:
				'https://books.google.com/books/content?id=dtpzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=dtpzEAAAQBAJ'
		},
		{
			title: 'American Poly',
			author: 'Christopher M. Gleason',
			coverImage:
				'https://books.google.com/books/content?id=zTHaEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=zTHaEAAAQBAJ'
		},
		{
			title: 'Slouching Towards Bethlehem',
			author: 'Joan Didion',
			coverImage:
				'https://books.google.com/books/content?id=XF8HEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=XF8HEQAAQBAJ'
		},
		{
			title: 'Macbeth',
			author: 'William Shakespeare',
			coverImage:
				'https://books.google.com/books/content?id=2WJ9x_PVVOQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=2WJ9x_PVVOQC'
		},
		{
			title: 'All Quiet on the Western Front',
			author: 'Erich Maria Remarque',
			coverImage:
				'https://books.google.com/books/content?id=Ubk7YzNZGQUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=Ubk7YzNZGQUC'
		},
		{
			title: 'The Case Against Reality',
			author: 'Donald Hoffman',
			coverImage:
				'https://books.google.com/books/content?id=JgJ1DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=JgJ1DwAAQBAJ'
		},
		{
			title: 'Reality+',
			author: 'David J. Chalmers',
			coverImage:
				'https://books.google.com/books/content?id=DUM3EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=DUM3EAAAQBAJ'
		},
		{
			title: 'Dune',
			author: 'Frank Herbert',
			coverImage:
				'https://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=B1hSG45JCX4C'
		},
		{
			title: 'Project Hail Mary',
			author: 'Andy Weir',
			coverImage:
				'https://books.google.com/books/content?id=iEiHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=iEiHEAAAQBAJ'
		},
		{
			title: 'Exhalation',
			author: 'Ted Chiang',
			coverImage:
				'https://books.google.com/books/content?id=L61oDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=L61oDwAAQBAJ'
		},
		{
			title: 'The Illustrated Man',
			author: 'Ray Bradbury',
			coverImage:
				'https://books.google.com/books/content?id=-QC3TyfN3zoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=-QC3TyfN3zoC'
		},
		{
			title: 'Killing Commendatore',
			author: 'Haruki Murakami',
			coverImage:
				'https://books.google.com/books/content?id=gLZMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=gLZMDwAAQBAJ'
		},
		{
			title: 'When Breath Becomes Air',
			author: 'Paul Kalanithi',
			coverImage:
				'https://books.google.com/books/publisher/content?id=93faCwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0MfwurwmsvjBOdvfo21vb71XZeSw&w=1280',
			url: 'https://books.google.com/books?id=93faCwAAQBAJ'
		},
		{
			title: 'The Courage to be Disliked',
			author: 'Ichiro Kishimi and Fumitake Koga',
			coverImage:
				'https://books.google.com/books/content?id=db0AEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=db0AEQAAQBAJ'
		},
		{
			title: 'Lying',
			author: 'Sam Harris',
			coverImage:
				'https://books.google.com/books/content?id=aVz_BgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=aVz_BgAAQBAJ'
		},
		{
			title: 'The Remains of the Day',
			author: 'Kazuo Ishiguro',
			coverImage:
				'https://books.google.com/books/content?id=mVzI9sCsCRkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=mVzI9sCsCRkC'
		},
		{
			title: 'Sapiens',
			author: 'Yuval Noah Harari',
			coverImage:
				'https://books.google.com/books/content?id=FmyBAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=FmyBAwAAQBAJ'
		},
		{
			title: 'Homo Deus',
			author: 'Yuval Noah Harari',
			coverImage:
				'https://books.google.com/books/content?id=H2t_CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=H2t_CwAAQBAJ'
		},
		{
			title: 'Solaris',
			author: 'Stanisław Lem',
			coverImage:
				'https://books.google.com/books/content?id=i8IwKGIAV2wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=i8IwKGIAV2wC'
		},
		{
			title: 'Consider the Lobster',
			author: 'David Foster Wallace',
			coverImage:
				'https://books.google.com/books/content?id=00OFZG6XKfoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=00OFZG6XKfoC'
		},
		{
			title: 'Notes from Underground',
			author: 'Fyodor Dostoevsky',
			coverImage:
				'https://books.google.com/books/content?id=M9iTEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=M9iTEAAAQBAJ'
		},
		{
			title: 'The Master and Margarita',
			author: 'Mikhail Bulgakov',
			coverImage:
				'https://books.google.com/books/content?id=7MABzbrknvwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=7MABzbrknvwC'
		},
		{
			title: 'Heart of a Dog',
			author: 'Mikhail Bulgakov',
			coverImage:
				'https://books.google.com/books/content?id=8Be1Px0Nc5EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
			url: 'https://books.google.com/books?id=8Be1Px0Nc5EC'
		}
	];
</script>

<div class="mx-auto max-w-5xl px-4 py-8 md:px-8">
	<nav class="mb-8">
		<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Bookshelf' }]} />
	</nav>
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
		{#each books as book}
			<a href={book.url} class="group">
				<div
					class="h-full overflow-hidden rounded-md bg-white shadow transition-all hover:shadow-lg dark:border dark:border-stone-800 dark:bg-transparent"
				>
					<div class="aspect-[2/3] overflow-hidden">
						<img
							src={book.coverImage}
							alt={`Cover of ${book.title}`}
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</div>
					<div class="p-4">
						<h2 class="leading-tight font-semibold">{book.title}</h2>
						<p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{book.author}</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
