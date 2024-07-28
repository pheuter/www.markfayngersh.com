import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import AudioRecorderPolyfill from "@/components/AudioRecorderPolyfill";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Mark Fayngersh",
  description: "The personal website of Mark Fayngersh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AudioRecorderPolyfill />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
