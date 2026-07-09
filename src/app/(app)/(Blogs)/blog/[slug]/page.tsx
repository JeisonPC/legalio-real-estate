import Layout from "@/components/layouts/Layout-defaul";
import BlogPost1 from "@/components/blog/BlogPost1";
import { notFound } from "next/navigation";
import { BlogsQuery, getBlogBySlug } from "@/lib/queries/blog.query";
import { getMediaUrl } from "@/lib/media/getMediaUrl";
import type { Media } from "@/payload-types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogItem = await getBlogBySlug(slug);

  if (!blogItem) {
    return {
      title: "Artículo no encontrado | Legalio",
    };
  }

  const coverImage =
    typeof blogItem.coverImage === "object" && blogItem.coverImage !== null
      ? (blogItem.coverImage as Media)
      : undefined;
  const imageUrl = coverImage ? getMediaUrl(coverImage, "card") : undefined;

  return {
    title: `${blogItem.title} | Legalio`,
    description: blogItem.excerpt,
    alternates: {
      canonical: `/blog/${blogItem.slug}`,
    },
    openGraph: {
      title: `${blogItem.title} | Legalio`,
      description: blogItem.excerpt,
      url: `/blog/${blogItem.slug}`,
      type: "article",
      publishedTime: blogItem.publishedAt ?? undefined,
      modifiedTime: blogItem.updatedAt,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: coverImage?.alt || blogItem.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const blogItem = await getBlogBySlug(slug);

  if (!blogItem) {
    notFound();
  }

  return (
    <Layout>
      <BlogPost1 blogItem={blogItem} />
    </Layout>
  );
}

export async function generateStaticParams() {
  try {
    const blogs = await BlogsQuery({
      page: 1,
      limit: 100,
    });

    return blogs.docs
      .filter((blog) => blog.slug)
      .map((blog) => ({
        slug: blog.slug,
      }));
  } catch (error) {
    console.error("generateStaticParams blogs error:", error);
    return [];
  }
}
