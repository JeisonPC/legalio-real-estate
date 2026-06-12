"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import SideBar from "./SideBar";
import Pagination from "../common/Pagination";
import { Blog } from "@/payload-types";
import { getUserDisplayName } from "@/helpers/helpers";

interface BlogListProps {
  blogs: Blog[];
  totalDocs: number;
  currentPage: number;
  itemPerPage: number;
}

export default function BlogList({
  blogs,
  totalDocs,
  currentPage,
  itemPerPage,
}: BlogListProps) {
  const router = useRouter();

  const handleSetPage = (page: number) => {
    router.push(`/blog?page=${page}`);
  };

  return (
    <div className="tf-container tf-spacing-1 blog-list">
      <div className="row">
        <div className="col-lg-8">
          <div className="wrap-blog style-list">
            {blogs.map((item) => {
              const blogHref = `/blog/${item.slug}`;

              const image =
                typeof item.coverImage === "object" && item.coverImage?.url
                  ? item.coverImage.url
                  : "/assets/images/blog/card-blog-default-white.png";

              const imageAlt =
                typeof item.coverImage === "object" && item.coverImage?.alt
                  ? item.coverImage.alt
                  : (item.title ?? "Blog Legalio");

              const authorName =
                item.author &&
                typeof item.author === "object" &&
                "id" in item.author
                  ? getUserDisplayName(item.author, "Legalio")
                  : "Legalio";

              return (
                <div
                  className="blog-article-item style-list hover-image-translate"
                  key={item.id}
                >
                  <div className="article-thumb image-wrap">
                    <Image
                      loading="lazy"
                      src={image}
                      width={850}
                      height={478}
                      alt={imageAlt}
                    />

                    <Link
                      href={blogHref}
                      className="tag text-label text text_primary-color text-uppercase"
                    >
                      {item.category ?? "Legal inmobiliario"}
                    </Link>

                    <Link href={blogHref} className="overlay-link" />
                  </div>

                  <div className="article-content">
                    <div className="meta-post d-flex align-items-center mb_12">
                      <div className="item text_secondary-color text-caption-1">
                        Publicado por{" "}
                        <span className="link text_primary-color">
                          {authorName}
                        </span>
                      </div>

                      <div className="item text_secondary-color text-caption-1">
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString(
                              "es-CO",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )
                          : ""}
                      </div>
                    </div>

                    <h5 className="title mb_12">
                      <Link href={blogHref} className="line-clamp-2 link">
                        {item.title}
                      </Link>
                    </h5>

                    <p className="description text-body-default mb_20 line-clamp-3">
                      {item.excerpt}
                    </p>

                    <Link
                      href={blogHref}
                      className="hover-underline-link text-button text_primary-color"
                    >
                      Leer más
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            setPage={handleSetPage}
            itemLength={totalDocs}
            itemPerPage={itemPerPage}
          />
        </div>

        {/* <div className="col-lg-4">
          <SideBar />
        </div> */}
      </div>
    </div>
  );
}
