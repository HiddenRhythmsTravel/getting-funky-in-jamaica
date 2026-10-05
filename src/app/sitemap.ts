import { MetadataRoute } from "next";
import { DESTINATIONS_DATA } from "@/data/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = "https://gettingfunkyinjamaica.com";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${domain}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${domain}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Programmatic destination silo routes
  const destinationRoutes: MetadataRoute.Sitemap = Object.keys(DESTINATIONS_DATA).map(
    (slug) => ({
      url: `${domain}/destinations/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  return [...staticRoutes, ...destinationRoutes];
}
