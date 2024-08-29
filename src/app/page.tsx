import Image from "next/image";
import Link from "next/link";

import profilePic from "@/img/mark_profile_blur_small_compressed.webp";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl py-16 px-4 md:py-32">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <Image
          priority
          className="w-80 h-full"
          alt="Profile picture of Mark"
          src={profilePic}
        />
        <div className="prose prose-h1:text-center md:prose-h1:text-left dark:prose-invert">
          <h1>Mark Fayngersh</h1>
          <p>
            <strong>Mark</strong> is the cofounder of Careswitch, an AI-powered
            home care startup. Previously, he worked on a modern collaborative
            care platform at Quartet Health, and researched meaningful
            interactions and collective experiences for large, distributed
            audiences at the MIT Media Lab.
          </p>
          <p className="flex items-center justify-center md:justify-start space-x-2">
            <Link href="/posts" className="hover:underline">
              Blog
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
