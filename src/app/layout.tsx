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
      <head>
        {/* CSS Override to completely hide the Vercel Toolbar under all conditions */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              vercel-live-feedback,
              #vercel-live-feedback,
              .vercel-live-feedback,
              [id*="vercel-preview-feedback"],
              [class*="vercel-preview-feedback"],
              [id*="vercel-live-feedback"],
              [class*="vercel-live-feedback"],
              iframe[src*="vercel.com"],
              iframe[src*="vercel-preview-feedback"],
              #__next-prerender-indicator {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                width: 0 !important;
                height: 0 !important;
              }
            `
          }}
        />
        {/* JS Override to proactively intercept and purge Vercel Toolbar scripts/elements */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;

                // 1. Purge any scripts/elements that exist during startup
                function purge() {
                  const existing = document.querySelectorAll('script[src*="vercel"], vercel-live-feedback, [id*="vercel-preview-feedback"]');
                  existing.forEach(function(el) {
                    if (el.parentNode) el.parentNode.removeChild(el);
                  });
                }
                
                // Run immediate purge
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', purge);
                } else {
                  purge();
                }

                // 2. Active MutationObserver to catch subsequent injections
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                      if (node.nodeName === 'SCRIPT' && node.src && (node.src.indexOf('vercel') !== -1 || node.src.indexOf('vercel.com/toolbar') !== -1)) {
                        node.parentNode.removeChild(node);
                      }
                      if (node.nodeName && (
                        node.nodeName.startsWith('VERCEL') || 
                        node.nodeName === 'VERCEL-LIVE-FEEDBACK' ||
                        (node.id && node.id.indexOf('vercel') !== -1) ||
                        (node.className && typeof node.className === 'string' && node.className.indexOf('vercel') !== -1)
                      )) {
                        node.parentNode.removeChild(node);
                      }
                    });
                  });
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });

                // 3. Periodic sanity check fallback
                setInterval(purge, 500);
              })();
            `
          }}
        />
      </head>
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
            (function() {
              var popupLoaded = false;
              function triggerPopup() {
                if (popupLoaded) return;
                if (typeof loadZCPopup === 'function') {
                  loadZCPopup('3z885d5fdd585765019298a8935476f16df0d899a326f420f4134b355ed0d0cec0','ZCFORMVIEW','3z3d2f2306564f279d03c79cd4c4e617ab');
                  popupLoaded = true;
                  cleanup();
                }
              }

              function handleMouseLeave(e) {
                if (e.clientY < 50) {
                  triggerPopup();
                }
              }

              function handleVisibilityChange() {
                if (document.visibilityState === 'hidden') {
                  triggerPopup();
                }
              }

              function cleanup() {
                document.removeEventListener('mouseleave', handleMouseLeave);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
              }

              // Bind trigger events
              document.addEventListener('mouseleave', handleMouseLeave);
              document.addEventListener('visibilitychange', handleVisibilityChange);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
