import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GLOWL WORKS — Creative Production Studio",
  description:
    "Premium creative production studio specializing in commercial animation, gaming videos, cinema, and motion design.",
  openGraph: {
    title: "GLOWL WORKS",
    description: "Creative production studio — animation, gaming, cinema & motion design.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="cosmic-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
