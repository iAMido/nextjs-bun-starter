import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Running Coach | AI-Powered Training",
  description: "Your personal AI running coach. Track runs, get training plans, analyze performance, and connect with Strava.",
  keywords: ["Running Coach", "AI Coach", "Training Plan", "Strava", "Running", "Fitness"],
  authors: [{ name: "Ido Mosseri" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Running Coach | AI-Powered Training",
    description: "Your personal AI running coach. Track runs, get training plans, and analyze performance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Running Coach | AI-Powered Training",
    description: "Your personal AI running coach. Track runs, get training plans, and analyze performance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}