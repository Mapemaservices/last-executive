import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Executive Gents Dollhouse | Luxury Men's Spa Kenya",
  description:
    "Luxury-tier, fully responsive spa experience for men. Opulence, comfort, trust, and elite wellness in Kenya. Book now!",
  openGraph: {
    title: "Executive Gents Dollhouse",
    description:
      "Luxury-tier, fully responsive spa experience for men. Opulence, comfort, trust, and elite wellness in Kenya. Book now!",
    url: "https://thegentsdollhouse.co.ke",
    siteName: "Executive Gents Dollhouse",
    images: [
      {
        url: "/gallery/hero.webp",
        width: 1200,
        height: 630,
        alt: "Executive Gents Dollhouse Hero",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Gents Dollhouse",
    description:
      "Luxury-tier, fully responsive spa experience for men. Opulence, comfort, trust, and elite wellness in Kenya. Book now!",
    images: ["/gallery/hero.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-black dark:bg-black dark:text-gold transition-colors duration-300">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
