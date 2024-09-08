import type { Metadata } from "next";
import { Sora} from 'next/font/google'
import Link from 'next/link'
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-700 p-4 text-white ${suse.className} ${heading.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
