import React from "react";

export interface SEOProps {
  title: string;
  description: string;
  slug: string;
  keywords?: string[];
  schemaType?: "TouristDestination" | "BusinessEvent" | "TravelAction";
  ogImage?: string;
  canonicalUrl?: string;
}

export function SEOHead({
  title,
  description,
  slug,
  keywords = [],
  schemaType = "TouristDestination",
  ogImage,
  canonicalUrl,
}: SEOProps) {
  const domain = "https://hiddenrhythmstravel.com";
  const fullUrl = canonicalUrl || `${domain}/destinations/${slug}`;
  const computedOgImage =
    ogImage || `${domain}/api/og?title=${encodeURIComponent(title)}&location=${encodeURIComponent(slug)}`;

  // Base Organization Schema
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${domain}/#organization`,
    name: "Hidden Rhythms",
    url: domain,
    logo: `${domain}/icon.jpg`,
    sameAs: [
      "https://www.instagram.com/hiddenrhythmstravel",
    ],
    description:
      "Curated experiential travel, luxury retreats, and authentic cultural immersion across iconic global destinations.",
  };

  // Structured Data based on schemaType
  let customSchema: object;

  if (schemaType === "BusinessEvent") {
    customSchema = {
      "@type": "BusinessEvent",
      "@id": `${fullUrl}/#event`,
      name: title,
      description: description,
      url: fullUrl,
      organizer: {
        "@type": "Organization",
        name: "Hidden Rhythms",
        url: domain,
      },
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      offers: {
        "@type": "Offer",
        url: `${domain}/#contact`,
        availability: "https://schema.org/InStock",
        category: "Bespoke Corporate & Executive Retreats",
      },
    };
  } else {
    // Default TouristDestination & TravelAction
    customSchema = {
      "@type": "TouristDestination",
      "@id": `${fullUrl}/#destination`,
      name: title,
      description: description,
      url: fullUrl,
      touristType: ["Experiential Traveler", "Luxury Traveler", "Cultural Explorer"],
      potentialAction: {
        "@type": "TravelAction",
        name: `Explore ${title}`,
        target: fullUrl,
      },
      provider: {
        "@type": "Organization",
        name: "Hidden Rhythms",
        url: domain,
      },
    };
  }

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, customSchema],
  };

  return (
    <>
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData),
        }}
      />
    </>
  );
}

/**
 * Helper to generate Next.js Metadata object for App Router pages
 */
export function buildSEOMetadata({
  title,
  description,
  slug,
  keywords = [],
  ogImage,
}: {
  title: string;
  description: string;
  slug: string;
  keywords?: string[];
  ogImage?: string;
}) {
  const domain = "https://hiddenrhythmstravel.com";
  const url = slug ? `${domain}/destinations/${slug}` : domain;
  const computedOgImage =
    ogImage || `${domain}/api/og?title=${encodeURIComponent(title)}&location=${encodeURIComponent(slug)}`;

  return {
    title: `${title} | Hidden Rhythms`,
    description,
    keywords: [
      "Hidden Rhythms",
      "Experiential travel",
      "Luxury retreats",
      "Cultural immersion",
      "Off-the-beaten-path journeys",
      ...keywords,
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Hidden Rhythms`,
      description,
      url,
      siteName: "Hidden Rhythms",
      images: [
        {
          url: computedOgImage,
          width: 1200,
          height: 630,
          alt: `${title} - Hidden Rhythms`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Hidden Rhythms`,
      description,
      images: [computedOgImage],
    },
  };
}
