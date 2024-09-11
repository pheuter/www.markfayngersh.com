import Image from "next/image";
import Link from "next/link";

import profilePic from "@/img/mark_profile_blur_small_compressed.webp";

export default function Home() {
  return (
    <div className="mx-auto block max-w-4xl px-4 py-16 md:py-32">
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
        <Image
          priority
          className="h-full w-80"
          alt="Profile picture of Mark"
          src={profilePic}
        />
        <div className="prose dark:prose-invert prose-h1:text-center md:prose-h1:text-left">
          <h1>Mark Fayngersh</h1>
          <p>
            <strong>Mark</strong> is the cofounder of Careswitch, an AI-powered
            home care startup. He previously worked on a collaborative care
            platform at Quartet Health and researched interactions for large,
            distributed audiences at the MIT Media Lab.
          </p>
          <p className="flex items-center justify-center space-x-2 md:justify-start">
            <Link href="/posts" className="hover:underline">
              Blog
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/bookshelf" className="hover:underline">
              Bookshelf
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/api/resume" className="hover:underline">
              Resume
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
