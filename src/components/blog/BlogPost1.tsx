import Image from "next/image";
import Link from "next/link";
// import FormComments from "../common/FormComments";
import SideBar2 from "./SideBar2";
// import Comment from "../common/Comment";
import type {
  Blog,
  // Media,
  User,
} from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import NewsInsightServer from "./NewsInsight.server";
import { getUserDisplayName } from "@/helpers/helpers";

type BlogPost1Props = {
  blogItem: Blog;
};

const categoryLabels: Record<string, string> = {
  arrendamiento: "Arrendamiento",
  "compra-vivienda": "Compra de vivienda",
  "propiedad-horizontal": "Propiedad horizontal",
  "legal-inmobiliario": "Legal inmobiliario",
};

// function getCoverImage(blogItem: Blog) {
//   if (
//     typeof blogItem.coverImage === "object" &&
//     blogItem.coverImage &&
//     "url" in blogItem.coverImage &&
//     blogItem.coverImage.url
//   ) {
//     return blogItem.coverImage as Media;
//   }

//   return null;
// }

function getAuthor(blogItem: Blog) {
  if (
    typeof blogItem.author === "object" &&
    blogItem.author &&
    "id" in blogItem.author
  ) {
    return blogItem.author as User;
  }

  return null;
}

function formatDate(date?: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost1({ blogItem }: BlogPost1Props) {
  //   const coverImage = getCoverImage(blogItem);
  const author = getAuthor(blogItem);

  //   const imageSrc =
  //     coverImage?.url ?? "/assets/images/blog/card-blog-default-white.png";

  //   const imageAlt = coverImage?.alt ?? blogItem.title ?? "Blog Legalio";

  const authorName = getUserDisplayName(author, "Legalio");

  const category =
    blogItem.category && categoryLabels[blogItem.category]
      ? categoryLabels[blogItem.category]
      : "Legal inmobiliario";

  const publishedDate = formatDate(blogItem.publishedAt ?? blogItem.createdAt);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://legalio.com.co";

  const postUrl = `${siteUrl}/blog/${blogItem.slug}`;
  const encodedPostUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(
    blogItem.title ?? "Artículo de Legalio",
  );

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedPostUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedPostUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedPostUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedPostUrl}`,
  };

  const authorAvatar =
    typeof author?.avatar === "object" && author.avatar?.url
      ? author.avatar.url
      : "/assets/images/blog/avatar-default.png";

  return (
    <div>
      {/* <div className="thumbs-main-post">
        <div className="thumbs">
          <Image
            src={imageSrc}
            width={1920}
            height={800}
            alt={imageAlt}
            priority
          />
        </div>
      </div> */}

      <div style={{ marginTop: 120 }} className="main-content">
        <div className="blog-post">
          <div className="tf-container tf-spacing-1">
            <div className="row">
              <div className="col-lg-8">
                <div className="details-post">
                  <div className="heading-title mb_24">
                    <div className="tag-heading text-button-small text_primary-color">
                      {category}
                    </div>

                    <h3>{blogItem.title}</h3>

                    <div className="meta-post d-flex align-items-center mb_16">
                      <div className="item author">
                        <div className="avatar">
                          <Image
                            src={authorAvatar}
                            width={40}
                            height={40}
                            alt={authorName}
                          />
                        </div>

                        <span className="link text_primary-color fw-6 text-title">
                          {authorName}
                        </span>
                      </div>

                      <div className="item text_primary-color text-title fw-6 d-flex align-items-center gap_8">
                        <i className="icon-CalendarBlank"></i>
                        {publishedDate}
                      </div>
                    </div>
                  </div>

                  {blogItem.excerpt && (
                    <p className="passive text-body-2">{blogItem.excerpt}</p>
                  )}

                  {blogItem.quote && (
                    <div className="quote">
                      <p className="h5 mb_11">&quot;{blogItem.quote}&quot;</p>

                      {blogItem.quoteAuthor && (
                        <span className="text-title fw-6 text_primary-color name">
                          {blogItem.quoteAuthor}
                        </span>
                      )}

                      <div className="icon">
                        <i className="icon-quote-line"></i>
                      </div>
                    </div>
                  )}

                  <div className="blog-rich-content passive text-body-2">
                    <RichText data={blogItem.content} />
                  </div>

                  <div className="tag-share d-flex justify-content-between">
                    <div className="tag d-flex align-items-center gap_12">
                      <span className="text-button fw-7 text_primary-color">
                        Etiquetas:
                      </span>

                      <ul className="tags-list">
                        <li>
                          <Link href="#" className="tags-item text-caption-1">
                            {category}
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="tags-item text-caption-1">
                            Inmobiliario
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="tags-item text-caption-1">
                            Legalio
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="share d-flex align-items-center gap_16">
                      <span className="text-button fw-7 text_primary-color">
                        Compartir:
                      </span>

                      <ul className="tf-social d-flex gap_24">
                        <li>
                          <Link
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-FacebookLogo"
                            aria-label="Compartir en Facebook"
                          />
                        </li>

                        <li>
                          <Link
                            href={shareLinks.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-XLogo"
                            aria-label="Compartir en X"
                          />
                        </li>

                        <li>
                          <Link
                            href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Compartir en WhatsApp"
                            className="icon-social-svg"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.16 1.6 5.97L0 24l6.22-1.63a11.9 11.9 0 0 0 5.84 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.42Zm-8.45 18.36h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.97.99-3.6-.23-.37a9.87 9.87 0 0 1-1.51-5.29c0-5.48 4.46-9.94 9.95-9.94a9.88 9.88 0 0 1 7.03 2.91 9.86 9.86 0 0 1 2.9 7.03c0 5.49-4.46 9.88-10.03 9.88Zm5.45-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                            </svg>
                          </Link>
                        </li>

                        <li>
                          <Link
                            href={shareLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Compartir en LinkedIn"
                            className="social-svg-link"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V23h-4V8z" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="tf-article-navigation">
                    <div className="item prev">
                      <Link
                        href="/blog"
                        className="hover-underline-link text-button text_primary-color fw-7 mb_8"
                      >
                        Volver al blog
                      </Link>

                      <h5>
                        <Link href="/blog" className="link line-clamp-2">
                          Ver más artículos inmobiliarios
                        </Link>
                      </h5>
                    </div>
                  </div>
                </div>

                {/* <div className="mb_40">
                  <Comment />
                </div> */}

                {/* <FormComments /> */}
              </div>

              <div className="col-lg-4">
                <SideBar2
                  authorAvatar={authorAvatar}
                  authorDesc="Contenido legal e inmobiliario para propietarios, arrendadores e inversionistas."
                  authorName={authorName}
                  authorFlow={0}
                />
              </div>
            </div>
          </div>
        </div>

        <NewsInsightServer />
      </div>
    </div>
  );
}
