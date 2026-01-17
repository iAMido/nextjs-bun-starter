import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}