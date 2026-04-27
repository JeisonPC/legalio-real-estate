import Layout from "@/components/layouts/Layout-defaul";
import BlogPost1 from "@/components/blog/BlogPost1";
import { notFound } from "next/navigation";
import { BlogsQuery, getBlogBySlug } from "@/lib/queries/blog.query";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
  const blogs = await BlogsQuery({
    page: 1,
    limit: 100,
  });

  return blogs.docs
    .filter((blog) => blog.slug)
    .map((blog) => ({
      slug: blog.slug,
    }));
}
