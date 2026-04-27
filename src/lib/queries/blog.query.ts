import { getPayloadClient } from "@/lib/payload/getPayloadClient";
import type { Blog } from "@/payload-types";

interface BlogsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  q?: string;
}

export async function BlogsQuery({
  page = 1,
  limit = 10,
  category,
  q,
}: BlogsQueryParams) {
  const payload = await getPayloadClient();

  return payload.find({
    collection: "blogs",
    depth: 2,
    page,
    limit,
    sort: "-publishedAt",
    where: {
      and: [
        {
          status: {
            equals: "published",
          },
        },
        ...(category
          ? [
              {
                category: {
                  equals: category,
                },
              },
            ]
          : []),
        ...(q
          ? [
              {
                or: [
                  {
                    title: {
                      like: q,
                    },
                  },
                  {
                    excerpt: {
                      like: q,
                    },
                  },
                ],
              },
            ]
          : []),
      ],
    },
  });
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "blogs",
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: "published",
          },
        },
      ],
    },
  });

  return result.docs[0] ?? null;
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const payload = await getPayloadClient();

  try {
    return await payload.findByID({
      collection: "blogs",
      id,
      depth: 2,
    });
  } catch {
    return null;
  }
}

export async function getRecentBlogs(limit = 3) {
  const payload = await getPayloadClient();

  return payload.find({
    collection: "blogs",
    depth: 2,
    limit,
    sort: "-publishedAt",
    where: {
      status: {
        equals: "published",
      },
    },
  });
}

export async function getBlogCategoryCounts() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "blogs",
    depth: 0,
    limit: 100,
    where: {
      status: {
        equals: "published",
      },
    },
  });

  return result.docs.reduce<Record<string, number>>((acc, blog) => {
    if (!blog.category) return acc;

    acc[blog.category] = (acc[blog.category] ?? 0) + 1;

    return acc;
  }, {});
}
