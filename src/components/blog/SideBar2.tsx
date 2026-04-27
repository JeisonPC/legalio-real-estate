import React from "react";
import Image from "next/image";
import Link from "next/link";
import { subscribeNewsletter } from "@/actions/newsletterAction";
import {
  getBlogCategoryCounts,
  getRecentBlogs,
} from "@/lib/queries/blog.query";

type SideBar2Props = {
  authorAvatar?: string;
  authorDesc?: string;
  authorName?: string;
  authorFlow?: number;
};

const BLOG_BASE_PATH = "/blog";

const categories = [
  {
    label: "Arrendamiento",
    value: "arrendamiento",
  },
  {
    label: "Compra de vivienda",
    value: "compra-vivienda",
  },
  {
    label: "Propiedad horizontal",
    value: "propiedad-horizontal",
  },
  {
    label: "Legal inmobiliario",
    value: "legal-inmobiliario",
  },
];

const tags = [
  {
    id: 1,
    name: "Arriendos",
    href: `${BLOG_BASE_PATH}?category=arrendamiento`,
  },
  {
    id: 2,
    name: "Contratos",
    href: `${BLOG_BASE_PATH}?category=legal-inmobiliario`,
  },
  {
    id: 3,
    name: "Propietarios",
    href: `${BLOG_BASE_PATH}?category=arrendamiento`,
  },
  {
    id: 4,
    name: "Compra de vivienda",
    href: `${BLOG_BASE_PATH}?category=compra-vivienda`,
  },
  {
    id: 5,
    name: "Propiedad horizontal",
    href: `${BLOG_BASE_PATH}?category=propiedad-horizontal`,
  },
];

function formatDate(date?: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function SideBar2({
  authorAvatar = "/assets/images/blog/avatar-default.png",
  authorDesc = "Contenido legal e inmobiliario para propietarios, arrendadores e inversionistas.",
  authorName = "Legalio",
  authorFlow = 0,
}: SideBar2Props) {
  const [recentBlogs, categoryCounts] = await Promise.all([
    getRecentBlogs(3),
    getBlogCategoryCounts(),
  ]);

  return (
    <div className="tf-sidebar">
      <div className="sidebar-item sidebar-author">
        <div className="box-author mb_16">
          <div className="avatar">
            <Image
              src={authorAvatar}
              width={100}
              height={100}
              alt={authorName}
            />
          </div>

          <div className="content">
            <h6 className="mb_4">{authorName}</h6>

            {authorFlow > 0 && (
              <p className="text_secondary-color text-caption-1">
                {authorFlow} artículos publicados
              </p>
            )}
          </div>
        </div>

        <p className="text_secondary-color text-body-default">{authorDesc}</p>
      </div>

      <div className="sidebar-item sidebar-search">
        <h5 className="sidebar-title mb_14">Buscar</h5>

        <form className="form-search" action={BLOG_BASE_PATH}>
          <fieldset>
            <input
              type="text"
              placeholder="Buscar..."
              name="q"
              tabIndex={2}
              defaultValue=""
              aria-required="true"
            />
          </fieldset>

          <div className="button-submit">
            <button type="submit">
              <i className="icon-MagnifyingGlass"></i>
            </button>
          </div>
        </form>
      </div>

      <div className="sidebar-item sidebar-categories">
        <h5 className="sidebar-title mb_17">Categorías</h5>

        <ul className="list-categories d-grid gap_8">
          {categories.map((category) => (
            <li
              className="d-flex align-items-center justify-content-between text-body-default"
              key={category.value}
            >
              <Link
                href={`${BLOG_BASE_PATH}?category=${category.value}`}
                className="hover-line-text"
              >
                {category.label}
              </Link>

              <div className="number">
                ({categoryCounts[category.value] ?? 0})
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-item sidebar-recent-post">
        <h5 className="sidebar-title mb_17">Publicaciones recientes</h5>

        <ul>
          {recentBlogs.docs.map((post) => {
            const postHref = `${BLOG_BASE_PATH}/${post.slug}`;

            const image =
              typeof post.coverImage === "object" && post.coverImage?.url
                ? post.coverImage.url
                : "/assets/images/blog/card-blog-default-white.png";

            const imageAlt =
              typeof post.coverImage === "object" && post.coverImage?.alt
                ? post.coverImage.alt
                : (post.title ?? "Blog Legalio");

            return (
              <li className="recent-post hover-image-rotate" key={post.id}>
                <Link href={postHref} className="img-style">
                  <Image src={image} width={100} height={100} alt={imageAlt} />
                </Link>

                <div className="content">
                  <div className="meta-post d-flex align-items-center mb_7">
                    <div className="item text_secondary-color text-caption-2">
                      <span className="link text_primary-color">Legalio</span>
                    </div>

                    <div className="item text_secondary-color text-caption-2">
                      {formatDate(post.publishedAt ?? post.createdAt)}
                    </div>
                  </div>

                  <div className="text-title title text_primary-color fw-6">
                    <Link href={postHref} className="link line-clamp-2">
                      {post.title}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sidebar-item">
        <h5 className="sidebar-title mb_15">Suscríbete</h5>

        <form action={subscribeNewsletter} className="form-newsletter">
          <fieldset>
            <input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              tabIndex={2}
              defaultValue=""
              aria-required="true"
              required
            />
          </fieldset>

          <div className="button-submit">
            <button type="submit">
              <i className="icon-PaperPlaneTilt"></i>
            </button>
          </div>
        </form>
      </div>

      <div className="sidebar-item sidebar-tags">
        <h5 className="sidebar-title mb_15">Etiquetas</h5>

        <ul className="tags-list">
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link href={tag.href} className="tags-item text-caption-1">
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
