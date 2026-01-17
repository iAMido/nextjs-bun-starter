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
  title: "Ido Mosseri | Product & SEO Optimization Expert",
  description: "Technical SEO Lead with 10+ years of experience driving organic growth, search optimization, and product strategy. Specializing in enterprise SEO, data-driven insights, and AI-powered solutions.",
  keywords: ["Technical SEO", "Product Optimization", "Search Optimization", "SEO Expert", "Organic Growth", "Ido Mosseri"],
  authors: [{ name: "Ido Mosseri" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ido Mosseri | Product & SEO Optimization Expert",
    description: "Technical SEO Lead with 10+ years of experience driving organic growth, search optimization, and product strategy.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ido Mosseri | Product & SEO Optimization Expert",
    description: "Technical SEO Lead with 10+ years of experience driving organic growth, search optimization, and product strategy.",
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