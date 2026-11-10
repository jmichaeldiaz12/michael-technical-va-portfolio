import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/content/site";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

export const viewport: Viewport = { themeColor: "#15233F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={schibsted.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-button focus:bg-surface focus:px-4 focus:py-3 focus:font-semibold focus:text-ink focus:ring-2 focus:ring-signal"
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
