import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { Providers } from "@/lib/providers";
import { NextJsPortalOrderFix } from "@/components/nextjs-portal-order-fix";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Saudi Mining Platform",
    template: "%s | Saudi Mining Platform",
  },
  description:
    "AI-powered mineral prospectivity platform for geological analysis and exploration in Saudi Arabia.",
  keywords: [
    "Saudi Arabia",
    "Mining",
    "Minerals",
    "Geology",
    "Machine Learning",
    "Prospectivity",
    "SGS",
    "Arabian Shield",
  ],
  authors: [{ name: "Saudi Mining Platform" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saudimining.sa",
    siteName: "Saudi Mining Platform",
    title: "Saudi Mining Platform",
    description:
      "AI-powered mineral prospectivity platform for geological analysis",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saudi Mining Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saudi Mining Platform",
    description:
      "AI-powered mineral prospectivity platform for geological analysis",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Script to prevent flash of incorrect theme
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('saudi-mining-store');
      var theme = 'system';
      if (stored) {
        var parsed = JSON.parse(stored);
        if (parsed.state && parsed.state.theme) {
          theme = parsed.state.theme;
        }
      }
      var root = document.documentElement;
      root.classList.remove('light', 'dark');
      if (theme === 'system') {
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    } catch (e) {
      document.documentElement.classList.add('light');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <NextJsPortalOrderFix />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

