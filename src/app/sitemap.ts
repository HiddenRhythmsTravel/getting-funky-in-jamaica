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
      url: `${domain}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/colombia-experience`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}/mexico-city-experience`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}/jamaica-experience`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}/new-orleans-experience`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}/bespoke-experience`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
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
