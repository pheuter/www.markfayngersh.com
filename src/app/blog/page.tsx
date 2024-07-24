import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={post.url}
          className="font-medium underline underline-offset-2"
        >
          {post.title}
        </Link>
      </h2>
      <time
        dateTime={post.date}
        className="mb-2 block text-xs text-muted-foreground"
      >
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <Button asChild size="icon" variant="ghost" className="absolute inset-2">
        <Link href="/">
          <HomeIcon className="size-4" />
        </Link>
      </Button>
      <div className="mx-auto max-w-xl py-8 px-4">
        <h1 className="scroll-m-20 text-center mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Mark&apos;s Blog
        </h1>

        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </>
  );
}
