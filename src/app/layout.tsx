import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Getting Funky in Jamaica | Jan 14-18, 2027",
  description: "Join the Trombone Shorty Foundation, Cimafunk, and Hidden Rhythms for Getting Funky in Jamaica. A curated cultural journey and high-energy musical exchange in Kingston, Jamaica.",
  keywords: [
    "Getting Funky in Jamaica", "Kingston Jamaica", "Trombone Shorty Foundation", 
    "Cimafunk", "Hidden Rhythms", "Gia Maione Prima Foundation", 
    "Cultural Journeys", "Luxury Travel Jamaica", "New Orleans Cuba Jamaica Jam"
  ],
  authors: [{ name: "Hidden Rhythms" }, { name: "Trombone Shorty Foundation" }],
  creator: "Hidden Rhythms",
  publisher: "Hidden Rhythms",
  openGraph: {
    title: "Getting Funky in Jamaica | Jan 14-18, 2027",
    description: "Experience the vibrant rhythms of Kingston. A cultural expedition featuring Trombone Shorty, Cimafunk, and youth educational exchanges in Jamaica.",
    url: "https://gettingfunkyinjamaica.com",
    siteName: "Getting Funky in Jamaica",
    images: [
      {
        url: "/assets/gallery/Tropical Crowd.webp", 
        width: 1200,
        height: 630,
        alt: "Getting Funky in Jamaica",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Getting Funky in Jamaica | Jan 14-18, 2027",
    description: "Experience the vibrant rhythms of Kingston. A cultural expedition featuring Trombone Shorty, Cimafunk, and youth educational exchanges in Jamaica.",
    images: ["/assets/gallery/Tropical Crowd.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
import { AudioProvider } from "@/contexts/AudioContext";
import { InteractionUnlocker } from "@/components/InteractionUnlocker";
import { GlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-brand-green text-brand-white selection:bg-brand-gold selection:text-brand-green`}
      >
        <AudioProvider>
          <InteractionUnlocker />
          <GlobalAudioPlayer />
          {children}
        </AudioProvider>

        {/* Zoho Campaigns Exit Intent Popup */}
        <Script
          id="ZC_Forms_Popup"
          src="https://campaigns.zoho.com/js/optin.min.js"
          strategy="afterInteractive"
        />
        <Script id="ZC_Forms_Popup_Init" strategy="afterInteractive">
          {`
            window.onload = function() {
              if (typeof loadZCPopup === 'function') {
                loadZCPopup('3z885d5fdd585765019298a8935476f16df0d899a326f420f4134b355ed0d0cec0','ZCFORMVIEW','3z3d2f2306564f279d03c79cd4c4e617ab');
              }
            };
            // Fallback in case window.onload already fired or optin script loaded late
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              if (typeof loadZCPopup === 'function') {
                loadZCPopup('3z885d5fdd585765019298a8935476f16df0d899a326f420f4134b355ed0d0cec0','ZCFORMVIEW','3z3d2f2306564f279d03c79cd4c4e617ab');
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
