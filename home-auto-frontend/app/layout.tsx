import type { Metadata } from "next";
import { Sora} from 'next/font/google'
import "./globals.css";

import { FileChartColumn, HousePlugIcon } from "lucide-react";
import Link from 'next/link'

const suse = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300'],
  variable: '--font-sora'
})
const heading = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500'],
  variable: '--font-heading'
})
export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background p-4 ${suse.className} ${heading.variable} antialiased`}
      >
        
        {children}
        <footer>
          <nav className="flex gap-s-m">
            <Link href="/" title="Home">
              <HousePlugIcon/>
            </Link>
            <Link href="/stats" title="Device stats">
              <FileChartColumn/>
            </Link>
          </nav>
        </footer>
      </body>

    </html>
  );
}
