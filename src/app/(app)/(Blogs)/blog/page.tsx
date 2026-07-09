import BlogList from "@/components/blog/BlogList";
import PageTitle from "@/components/blog/PageTitle";
import SideBar from "@/components/blog/SideBar";
import Layout from "@/components/layouts/Layout-defaul";
import { BlogsQuery } from "@/lib/queries/blog.query";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog inmobiliario y legal en Palmira | Legalio",
  description:
    "Guías sobre arriendos, compraventa, administración de inmuebles y respaldo legal inmobiliario para propietarios, arrendatarios y compradores.",
  alternates: {
    canonical: "/blog",
  },
};

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
};

export default async function Page({ searchParams }: BlogPageProps) {
  const { page, category, q } = await searchParams;

  const currentPage = Number(page ?? 1);

  const blogs = await BlogsQuery({
    page: currentPage,
    limit: 5,
    category,
    q,
  });

  return (
    <Layout>
      <PageTitle />

      <div className="main-content">
        <div className="tf-container tf-spacing-1 blog-list">
          <div className="row">
            <div className="col-lg-8">
              <BlogList
                blogs={blogs.docs}
                totalDocs={blogs.totalDocs}
                currentPage={blogs.page ?? currentPage}
                itemPerPage={blogs.limit ?? 5}
              />
            </div>

            <div className="col-lg-4">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
