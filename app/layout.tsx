import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LocalBusinessSchema from "./components/LocalBusinessSchema";

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Valdosta Fence Co | Local Family-Owned Fence Experts",
    template: "%s | Valdosta Fence Co",
  },
  description:
    "Your local, family-owned fence experts serving Valdosta, GA and surrounding areas within 25 miles. Quality wood, vinyl, chain link, and custom fencing installation and repair.",
  keywords: [
    "fence installation Valdosta GA",
    "fence company Valdosta",
    "wood fence Valdosta",
    "vinyl fence Georgia",
    "fence repair Valdosta",
    "local fence contractor",
    "family owned fence company",
  ],
  authors: [{ name: "Valdosta Fence Co" }],
  creator: "Valdosta Fence Co",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://valdostafenceco.com",
    siteName: "Valdosta Fence Co",
    title: "Valdosta Fence Co | Local Family-Owned Fence Experts",
    description:
      "Quality fencing installation and repair in Valdosta, GA. Family-owned, locally trusted.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valdosta Fence Co | Local Family-Owned Fence Experts",
    description:
      "Quality fencing installation and repair in Valdosta, GA. Family-owned, locally trusted.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={`${dmSerif.variable} ${jakarta.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
