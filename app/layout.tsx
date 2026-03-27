import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const siteTitle = "Hamburguesa Herreña — Nanis Burger | Concurso Frontera 2026";
const siteDescription =
  "La Hamburguesa Herreña: pan de fermento de piña, cochino negro a baja temperatura, queso herreño curado y barbacoa de higos pasados. Concurso de Hamburguesas, Frontera, El Hierro.";
const siteDomain = "https://burger.nanis.ai";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteDomain),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: siteDomain,
    siteName: "Nanis Burger",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEvent",
  name: "Hamburguesa Herreña — Concurso de Hamburguesas Frontera 2026",
  description: siteDescription,
  url: siteDomain,
  location: {
    "@type": "Place",
    name: "Plaza Benito Padrón",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Frontera",
      addressRegion: "El Hierro",
      addressCountry: "ES",
    },
  },
  organizer: {
    "@type": "Restaurant",
    name: "Nanis Burger",
    url: "https://nanisburger.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
