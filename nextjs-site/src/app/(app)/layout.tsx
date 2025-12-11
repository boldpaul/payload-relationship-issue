import type { Metadata } from "next";
import { Inter, Alike_Angular } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Link from "next/link";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const alikeAngular = Alike_Angular({
  variable: "--font-alike-angular",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "title here",
  description: "description here",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${alikeAngular.variable} antialiased`}
      >  
          <Link href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black">
            Skip to main content
          </Link>
            {children}
      </body>
    </html>
  );
}
