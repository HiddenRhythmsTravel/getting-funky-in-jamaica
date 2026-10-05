import React from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  slug?: string;
  keywords?: string[] | string;
  schemaType?: "TouristDestination" | "BusinessEvent" | "TravelAction" | "Event" | "TouristInformationCenter";
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
}

export const DEFAULT_SEO = {
  title: "Getting Funky in Jamaica | Jan 14-18, 2027 - Travel, Reggae & Island Culture Expedition",
  description: "Join the Trombone Shorty Foundation, Cimafunk, and Hidden Rhythms for Getting Funky in Jamaica. A curated cultural journey, high-energy reggae and funk musical exchange, authentic Jamaican cuisine, and vibrant nightlife in Kingston, Jamaica.",
  siteUrl: "https://gettingfunkyinjamaica.com",
  defaultOgImage: "https://gettingfunkyinjamaica.com/card_1_star_power.png",
  defaultKeywords: "Getting Funky in Jamaica, Jamaica travel guide, Reggae music, Jamaican nightlife, Kingston vibes, Montego Bay, Negril beaches, authentic Jamaican food, Trombone Shorty Foundation, Cimafunk, Hidden Rhythms, New Orleans Cuba Jamaica Jam",
};

export function SEOHead({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  slug = "",
  keywords = DEFAULT_SEO.defaultKeywords,
  schemaType = "TouristDestination",
  ogImage,
  canonicalUrl,
  noindex = false,
  structuredData,
}: SEOProps) {
  const domain = DEFAULT_SEO.siteUrl;
  const fullUrl = canonicalUrl || (slug ? `${domain}/destinations/${slug}` : domain);
  const computedOgImage =
    ogImage || `${domain}/api/og?title=${encodeURIComponent(title)}&tagline=${encodeURIComponent(description)}`;

  // Base Organization Schema
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${domain}/#organization`,
    name: "Getting Funky in Jamaica",
    url: domain,
    logo: `${domain}/card_1_star_power.png`,
    sameAs: [
      "https://www.instagram.com/hiddenrhythmstravel",
    ],
    description:
      "Curated experiential travel, luxury retreats, and authentic cultural immersion across iconic global destinations.",
  };

  // Structured Data based on schemaType or passed structuredData
  let customSchema: object;

  if (structuredData) {
    customSchema = structuredData;
  } else if (schemaType === "BusinessEvent") {
    customSchema = {
      "@type": "BusinessEvent",
      "@id": `${fullUrl}/#event`,
      name: title,
      description: description,
      url: fullUrl,
      organizer: {
        "@type": "Organization",
        name: "Getting Funky in Jamaica",
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
        name: "Getting Funky in Jamaica",
        url: domain,
      },
    };
  }

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, customSchema],
  };

  const formattedKeywords = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      {formattedKeywords && <meta name="keywords" content={formattedKeywords} />}

      <meta property="og:site_name" content="Getting Funky in Jamaica" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={computedOgImage} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={computedOgImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData),
        }}
      />
    </>
  );
}

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
  keywords?: string[] | string;
  ogImage?: string;
}) {
  const domain = DEFAULT_SEO.siteUrl;
  const url = slug ? `${domain}/destinations/${slug}` : domain;
  const computedOgImage =
    ogImage || `${domain}/api/og?title=${encodeURIComponent(title)}&tagline=${encodeURIComponent(description)}`;

  const keywordArray = Array.isArray(keywords) ? keywords : [keywords];

  return {
    title: `${title} | Getting Funky in Jamaica`,
    description,
    keywords: [
      "Getting Funky in Jamaica",
      "Experiential travel",
      "Luxury retreats",
      "Cultural immersion",
      ...keywordArray,
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
      title: `${title} | Getting Funky in Jamaica`,
      description,
      url,
      siteName: "Getting Funky in Jamaica",
      images: [
        {
          url: computedOgImage,
          width: 1200,
          height: 630,
          alt: `${title} - Getting Funky in Jamaica`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Getting Funky in Jamaica`,
      description,
      images: [computedOgImage],
    },
  };
}

export default SEOHead;
