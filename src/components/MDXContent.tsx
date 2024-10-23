'use client'

import { getMDXComponent } from "next-contentlayer2/hooks";

interface MDXContentProps {
  code: string;
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = getMDXComponent(code);
  return <Component />;
}
