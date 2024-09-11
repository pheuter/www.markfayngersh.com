import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { allPosts } from "contentlayer/generated";

import Link from "next/link";
import Voice from "@/components/Voice";
import { ChevronDownIcon, SlashIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <Breadcrumb className="px-4 py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                Blog
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {allPosts
                  .filter((p) => p._raw.flattenedPath !== params.slug)
                  .map((post) => (
                    <DropdownMenuItem key={post._raw.flattenedPath}>
                      <Link href={post._raw.flattenedPath}>{post.title}</Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <article className="mx-auto max-w-prose py-8">
        <div className="mb-8 text-center">
          <time
            dateTime={post.date}
            className="mb-1 block text-xs text-muted-foreground"
          >
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {post.title}
          </h2>
        </div>
        <div className="prose prose-lg px-4 dark:prose-invert sm:px-0">
          <MDXContent />
        </div>
      </article>
      <div className="fixed bottom-8 right-8 rounded-full">
        <Voice article={post.body.raw} />
      </div>
    </>
  );
}
