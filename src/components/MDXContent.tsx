'use client'

import { getMDXComponent } from "next-contentlayer2/hooks";
import { useMemo } from "react";

interface MDXContentProps {
  code: string;
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component />;
}
