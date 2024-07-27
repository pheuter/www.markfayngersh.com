import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { allPosts } from "contentlayer/generated";

import Link from "next/link";
import Voice from "@/components/Voice";
import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

export default async function PostLayout({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Button asChild size="icon" variant="ghost" className="absolute inset-2">
        <Link href="/">
          <HomeIcon className="size-4" />
        </Link>
      </Button>
      <article className="mx-auto max-w-prose py-8">
        <div className="mb-8 text-center">
          <time
            dateTime={post.date}
            className="block mb-1 text-xs text-muted-foreground"
          >
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {post.title}
          </h2>
        </div>
        <div className="px-4 prose prose-lg sm:px-0 dark:prose-invert">
          <MDXContent />
        </div>
      </article>
      <div className="fixed bottom-8 right-8 rounded-full">
        <Voice article={post.body.raw} />
      </div>
    </>
  );
}
