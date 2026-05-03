import type { MetadataRoute } from "next";

function getSiteUrl() {
  const productionUrl = "https://legalio.com.co";
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    productionUrl;

  const siteUrl = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  if (
    process.env.NODE_ENV === "production" &&
    /localhost|127\.0\.0\.1/.test(siteUrl)
  ) {
    return productionUrl;
  }

  return siteUrl.replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/api/",
        "/dashboard",
        "/dashboard/",
        "/my-route",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
