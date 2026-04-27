"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Blog } from "@/payload-types";

import "swiper/css";
import "swiper/css/pagination";

type NewsInsightProps = {
  blogs: Blog[];
};

const categoryLabels: Record<string, string> = {
  arrendamiento: "Arrendamiento",
  "compra-vivienda": "Compra de vivienda",
  "propiedad-horizontal": "Propiedad horizontal",
  "legal-inmobiliario": "Legal inmobiliario",
};

function formatDate(date?: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsInsight({ blogs }: NewsInsightProps) {
  if (!blogs.length) return null;

  return (
    <div className="tf-container sw-layout tf-spacing-1 pt-0">
      <div className="heading-section text-center mb_48">
        <h3>Artículos relacionados</h3>
      </div>

      <Swiper
        className="mySwiper"
        data-wow-delay=".2s"
        spaceBetween={15}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        pagination={{ clickable: true, el: ".spb7" }}
      >
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

          const category =
            item.category && categoryLabels[item.category]
              ? categoryLabels[item.category]
              : "Legal inmobiliario";

            const author = item.author && typeof item.author === "object" && "id" in item.author
              ? item.author as { fullName?: string; email?: string }
              : { fullName: "Legalio" };

          return (
            <SwiperSlide className="swiper-slide" key={item.id}>
              <div className="blog-article-item style-default hover-image-translate loadItem">
                <div className="article-thumb image-wrap mb_24">
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
                    {category}
                  </Link>

                  <Link href={blogHref} className="overlay-link" />
                </div>

                <div className="article-content">
                  <div className="meta-post d-flex align-items-center mb_12">
                    <div className="item text_secondary-color text-caption-1">
                      Publicado por{" "}
                      <span className="link text_primary-color">{author.fullName}</span>
                    </div>

                    <div className="item text_secondary-color text-caption-1">
                      {formatDate(item.publishedAt ?? item.createdAt)}
                    </div>
                  </div>

                  <h5 className="title mb_12">
                    <Link href={blogHref} className="link line-clamp-2">
                      {item.title}
                    </Link>
                  </h5>

                  <p className="description line-clamp-2">{item.excerpt}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="sw-pagination spb7 sw-dots style-1 text-center mt_24" />
      </Swiper>
    </div>
  );
}
