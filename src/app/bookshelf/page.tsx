import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";

interface Book {
  title: string;
  author: string;
  coverImage: string;
  url: string;
}

const books = [
  {
    title: "Indigenous Continent",
    author: "Pekka Hämäläinen",
    coverImage:
      "https://books.google.com/books/content?id=yYiQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    url: "https://books.google.com/books?id=yYiQEAAAQBAJ&dq=intitle:Indigenous+Continent+inauthor:Pekka+H%C3%A4m%C3%A4l%C3%A4inen&hl=&source=gbs_api",
  },
  {
    title: "Wittgenstein's Mistress",
    author: "David Markson",
    coverImage:
      "https://books.google.com/books/content?id=aitaEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=aitaEAAAQBAJ&source=gbs_api",
  },
  {
    title: "The Vital Question",
    author: "Nick Lane",
    coverImage:
      "https://books.google.com/books/content?id=KE6lMAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    url: "https://books.google.com/books?id=KE6lMAEACAAJ&dq=intitle:The+Vital+Question+inauthor:Nick+Lane&hl=&source=gbs_api",
  },
  {
    title: "Van Gogh: The Life",
    author: "Steven Naifeh and Gregory White Smith",
    coverImage:
      "https://books.google.com/books/content?id=HcYE8mZxDhoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=HcYE8mZxDhoC&dq=intitle:Van+Gogh:+The+Life+inauthor:Steven+Naifeh+and+Gregory+White+Smith&hl=&source=gbs_api",
  },
  {
    title: "Magnificent Rebels",
    author: "Andrea Wulf",
    coverImage:
      "https://books.google.com/books/content?id=iPW2EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=iPW2EAAAQBAJ&dq=intitle:Magnificent+Rebels+inauthor:Andrea+Wulf&hl=&source=gbs_api",
  },
  {
    title: "The Metamorphosis of Prime Intellect",
    author: "Roger Williams",
    coverImage:
      "https://books.google.com/books/content?id=JgccBdnUHT8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=JgccBdnUHT8C&dq=intitle:The+Metamorphosis+of+Prime+Intellect+inauthor:Roger+Williams&hl=&source=gbs_api",
  },
  {
    title: "To 2040",
    author: "Jorie Graham",
    coverImage:
      "https://books.google.com/books/content?id=PZi4EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: " https://play.google.com/store/books/details?id=PZi4EAAAQBAJ&source=gbs_api",
  },
  {
    title: "Midlife",
    author: "Kieran Setiya",
    coverImage:
      "https://books.google.com/books/content?id=fvSnDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=fvSnDgAAQBAJ&source=gbs_api",
  },
  {
    title: "Blitzed",
    author: "Norman Ohler",
    coverImage:
      "https://books.google.com/books/content?id=YN2pDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=YN2pDAAAQBAJ&source=gbs_api",
  },
  {
    title: "Trust",
    author: "Hernan Diaz",
    coverImage:
      "https://books.google.com/books/content?id=QyiwEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=QyiwEAAAQBAJ&dq=intitle:Trust+inauthor:Hernan+Diaz&hl=&source=gbs_api",
  },
  {
    title: "Surplus Enjoyment",
    author: "Slavoj Žižek",
    coverImage:
      "https://books.google.com/books/content?id=dtpzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=dtpzEAAAQBAJ&source=gbs_api",
  },
  {
    title: "American Poly",
    author: "Christopher M. Gleason",
    coverImage:
      "https://books.google.com/books/content?id=zTHaEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=zTHaEAAAQBAJ&dq=intitle:American+Poly+inauthor:Christopher+M.+Gleason&hl=&source=gbs_api",
  },
  {
    title: "Slouching Towards Bethlehem",
    author: "Joan Didion",
    coverImage:
      "https://books.google.com/books/content?id=XF8HEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=XF8HEQAAQBAJ&source=gbs_api",
  },
  {
    title: "Macbeth",
    author: "William Shakespeare",
    coverImage:
      "https://books.google.com/books/content?id=2WJ9x_PVVOQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=2WJ9x_PVVOQC",
  },
  {
    title: "All Quiet on the Western Front",
    author: "Erich Maria Remarque",
    coverImage:
      "https://books.google.com/books/content?id=Ubk7YzNZGQUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=Ubk7YzNZGQUC&dq=intitle:All+Quiet+on+the+Western+Front+inauthor:Erich+Maria+Remarque&hl=&source=gbs_api",
  },
  {
    title: "The Case Against Reality",
    author: "Donald Hoffman",
    coverImage:
      "https://books.google.com/books/content?id=JgJ1DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=JgJ1DwAAQBAJ&source=gbs_api",
  },
  {
    title: "Reality+",
    author: "David J. Chalmers",
    coverImage:
      "https://books.google.com/books/content?id=DUM3EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=DUM3EAAAQBAJ&source=gbs_api",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    coverImage:
      "https://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=B1hSG45JCX4C&dq=intitle:Dune+inauthor:Herbert&hl=&source=gbs_api",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage:
      "https://books.google.com/books/content?id=iEiHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=iEiHEAAAQBAJ&dq=intitle:Project+Hail+Mary+inauthor:Andy+Weir&hl=&source=gbs_api",
  },
  {
    title: "Exhalation",
    author: "Ted Chiang",
    coverImage:
      "https://books.google.com/books/content?id=L61oDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=L61oDwAAQBAJ&source=gbs_api",
  },
  {
    title: "The Illustrated Man",
    author: "Ray Bradbury",
    coverImage:
      "https://books.google.com/books/content?id=-QC3TyfN3zoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=-QC3TyfN3zoC&dq=intitle:The+Illustrated+Man+inauthor:Ray+Bradbury&hl=&source=gbs_api",
  },
  {
    title: "Killing Commendatore",
    author: "Haruki Murakami",
    coverImage:
      "https://books.google.com/books/content?id=gLZMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=gLZMDwAAQBAJ&source=gbs_api",
  },
  {
    title: "The Courage to be Disliked",
    author: "Ichiro Kishimi and Fumitake Koga",
    coverImage:
      "https://books.google.com/books/content?id=db0AEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=db0AEQAAQBAJ&dq=intitle:The+Courage+to+be+Disliked+inauthor:Ichiro+Kishimi+and+Fumitake+Koga&hl=&source=gbs_api",
  },
  {
    title: "Lying",
    author: "Sam Harris",
    coverImage:
      "https://books.google.com/books/content?id=aVz_BgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=aVz_BgAAQBAJ&source=gbs_api",
  },
  {
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    coverImage:
      "https://books.google.com/books/content?id=mVzI9sCsCRkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=mVzI9sCsCRkC&source=gbs_api",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverImage:
      "https://books.google.com/books/content?id=FmyBAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=FmyBAwAAQBAJ&source=gbs_api",
  },
  {
    title: "Homo Deus",
    author: "Yuval Noah Harari",
    coverImage:
      "https://books.google.com/books/content?id=H2t_CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=H2t_CwAAQBAJ&source=gbs_api",
  },
  {
    title: "Solaris",
    author: "Stanisław Lem",
    coverImage:
      "https://books.google.com/books/content?id=i8IwKGIAV2wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=i8IwKGIAV2wC&dq=intitle:Solaris+inauthor:Stanis%C5%82aw+Lem&hl=&source=gbs_api",
  },
  {
    title: "Consider the Lobster",
    author: "David Foster Wallace",
    coverImage:
      "https://books.google.com/books/content?id=00OFZG6XKfoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=00OFZG6XKfoC&source=gbs_api",
  },
  {
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    coverImage:
      "https://books.google.com/books/content?id=M9iTEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://play.google.com/store/books/details?id=M9iTEAAAQBAJ&source=gbs_api",
  },
  {
    title: "The Master and Margarita",
    author: "Mikhail Bulgakov",
    coverImage:
      "https://books.google.com/books/content?id=7MABzbrknvwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=7MABzbrknvwC&dq=intitle:The%2BMaster%2Band%2BMargarita+inauthor:Mikhail%2BBulgakov&hl=&source=gbs_api",
  },
  {
    title: "Heart of a Dog",
    author: "Mikhail Bulgakov",
    coverImage:
      "https://books.google.com/books/content?id=8Be1Px0Nc5EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    url: "https://books.google.com/books?id=8Be1Px0Nc5EC&dq=intitle:Heart%2Bof%2Ba%2BDog+inauthor:Mikhail%2BBulgakov&hl=&source=gbs_api",
  },
] satisfies Book[];

export default function Books() {
  return (
    <>
      <Button asChild size="icon" variant="ghost" className="absolute inset-2">
        <Link href="/">
          <HomeIcon className="size-4" />
        </Link>
      </Button>
      <div className="container py-16 md:py-32">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {books.map((book, index) => (
            <Link
              key={index}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
                <CardContent className="flex flex-grow flex-col p-3">
                  <img
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    className="mx-auto mb-2 h-48 w-32 rounded-sm object-cover"
                  />
                  <h2 className="line-clamp-2 text-center text-sm font-semibold">
                    {book.title}
                  </h2>
                  <p className="mt-1 text-center text-xs text-muted-foreground">
                    {book.author}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
