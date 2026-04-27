import type { MetadataRoute } from "next";

import { getPayloadClient } from "@/lib/payload/getPayloadClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

type StaticRoute = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

const STATIC_ROUTES: StaticRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/propiedades",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/blog",
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    path: "/contacto",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "https://legalio.com.co";

  const siteUrl = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  return siteUrl.replace(/\/+$/, "");
}

function createUrl(path: string) {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

function getValidDate(...dates: Array<string | null | undefined>) {
  for (const date of dates) {
    if (!date) continue;

    const parsedDate = new Date(date);

    if (!Number.isNaN(parsedDate.valueOf())) {
      return parsedDate;
    }
  }

  return undefined;
}

function dedupeEntries(entries: MetadataRoute.Sitemap) {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;

    seen.add(entry.url);
    return true;
  });
}

async function getPropertyEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayloadClient();
    const entries: MetadataRoute.Sitemap = [];
    let page = 1;
    let totalPages = 1;

    do {
      const result = await payload.find({
        collection: "properties",
        depth: 0,
        limit: 100,
        page,
        sort: "-updatedAt",
      });

      entries.push(
        ...result.docs.map((property) => ({
          url: createUrl(`/property-details-1/${property.id}`),
          lastModified: getValidDate(property.updatedAt, property.createdAt),
          changeFrequency: "weekly" as const,
          priority: 0.85,
        })),
      );

      totalPages = result.totalPages;
      page += 1;
    } while (page <= totalPages);

    return entries;
  } catch (error) {
    console.error("Unable to load property sitemap entries:", error);
    return [];
  }
}

async function getBlogEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayloadClient();
    const entries: MetadataRoute.Sitemap = [];
    let page = 1;
    let totalPages = 1;

    do {
      const result = await payload.find({
        collection: "blogs",
        depth: 0,
        limit: 100,
        page,
        sort: "-publishedAt",
        where: {
          status: {
            equals: "published",
          },
        },
      });

      entries.push(
        ...result.docs
          .filter((blog) => blog.slug)
          .map((blog) => ({
            url: createUrl(`/blog/${encodeURIComponent(blog.slug)}`),
            lastModified: getValidDate(
              blog.updatedAt,
              blog.publishedAt,
              blog.createdAt,
            ),
            changeFrequency: "weekly" as const,
            priority: 0.75,
          })),
      );

      totalPages = result.totalPages;
      page += 1;
    } while (page <= totalPages);

    return entries;
  } catch (error) {
    console.error("Unable to load blog sitemap entries:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [propertyEntries, blogEntries] = await Promise.all([
    getPropertyEntries(),
    getBlogEntries(),
  ]);

  return dedupeEntries([
    ...STATIC_ROUTES.map((route) => ({
      url: createUrl(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...propertyEntries,
    ...blogEntries,
  ]);
}
