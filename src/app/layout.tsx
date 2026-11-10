import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/content/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const title = "John Michael Diaz | Technical Virtual Assistant & IT Support Specialist";
const description =
  "Philippines-based Technical Virtual Assistant offering part-time remote IT support, Windows troubleshooting, network troubleshooting, website support, and workflow automation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: title, template: "%s | John Michael Diaz" },
  description,
  keywords: [
    "Technical Virtual Assistant Philippines",
    "Remote IT Support Specialist",
    "Part-Time IT Support",
    "Windows Troubleshooting",
    "Remote Technical Support",
    "Website Support Assistant",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.githubUrl }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0B1526" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrains.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-slate-900 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
