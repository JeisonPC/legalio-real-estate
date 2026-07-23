"use client";

import { getMediaUrl } from "@/lib/media/getMediaUrl";
import type { Media, Property } from "@/payload-types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "photoswipe/dist/photoswipe.css";
import "swiper/css";
import styles from "./Slide2.module.css";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={styles.arrowIcon}
      viewBox="0 0 24 24"
    >
      <path
        d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function PhotosIcon() {
  return (
    <svg aria-hidden="true" className={styles.photosIcon} viewBox="0 0 24 24">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <path
        d="m5.5 17 4.2-4.2 3.1 3.1 2.1-2.1 3.6 3.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Slide2({ property }: { property: Property }) {
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const images = (property.images ?? []).filter(
    (image): image is Media =>
      typeof image === "object" && image !== null && Boolean(image.url),
  );
  const photoCount = images.length;

  useEffect(() => {
    const selectedThumbnail = thumbnailRefs.current[activeIndex];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    selectedThumbnail?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  if (photoCount === 0) {
    return (
      <section
        aria-label={`Galería de fotos de ${property.title}`}
        className={`${styles.gallery} ${styles.emptyGallery}`}
      >
        <PhotosIcon />
        <p>Fotos disponibles próximamente</p>
      </section>
    );
  }

  const goToPhoto = (index: number) => {
    mainSwiper?.slideTo(index);
  };

  return (
    <section
      aria-label={`Galería de fotos de ${property.title}`}
      className={styles.gallery}
    >
      <PhotoSwipeGallery
        options={{
          bgOpacity: 0.96,
          showHideAnimationType: "fade",
          zoomAnimationDuration: 200,
        }}
      >
        <div className={styles.viewport}>
          <Swiper
            a11y={{
              enabled: true,
              firstSlideMessage: "Esta es la primera foto",
              lastSlideMessage: "Esta es la última foto",
              nextSlideMessage: "Foto siguiente",
              prevSlideMessage: "Foto anterior",
              slideLabelMessage: "Foto {{index}} de {{slidesLength}}",
            }}
            className={styles.mainSwiper}
            keyboard={{ enabled: true, onlyInViewport: true }}
            modules={[A11y, Keyboard]}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={setMainSwiper}
            slidesPerView={1}
            speed={280}
          >
            {images.map((image, index) => {
              const detailUrl = getMediaUrl(image, "detail");
              const imageAlt =
                image.alt?.trim() ||
                `${property.title}, foto ${index + 1} de ${photoCount}`;

              return (
                <SwiperSlide key={image.id || `${detailUrl}-${index}`}>
                  <Item
                    original={detailUrl}
                    thumbnail={getMediaUrl(image, "thumbnail")}
                    width={image.sizes?.detail?.width || image.width || 1200}
                    height={image.sizes?.detail?.height || image.height || 675}
                  >
                    {({ ref, open }) => (
                      <div className={styles.slideFrame}>
                        <div
                          aria-hidden="true"
                          className={styles.imageBackdrop}
                          style={{ backgroundImage: `url("${detailUrl}")` }}
                        />
                        <button
                          aria-label={`Abrir ${imageAlt} en pantalla completa`}
                          className={styles.photoButton}
                          onClick={open}
                          type="button"
                        >
                          <Image
                            ref={ref}
                            alt={imageAlt}
                            className={styles.mainImage}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 100vw, 63vw"
                            src={detailUrl}
                          />
                        </button>
                        <button
                          className={styles.viewAllButton}
                          onClick={open}
                          type="button"
                        >
                          <PhotosIcon />
                          <span>
                            Ver {photoCount} {photoCount === 1 ? "foto" : "fotos"}
                          </span>
                        </button>
                      </div>
                    )}
                  </Item>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <p
            aria-atomic="true"
            aria-live="polite"
            className={styles.counter}
          >
            <span className={styles.srOnly}>Foto </span>
            {activeIndex + 1} / {photoCount}
          </p>

          {photoCount > 1 && (
            <>
              <button
                aria-label="Ver foto anterior"
                className={`${styles.navigationButton} ${styles.previousButton}`}
                disabled={activeIndex === 0}
                onClick={() => mainSwiper?.slidePrev()}
                type="button"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                aria-label="Ver foto siguiente"
                className={`${styles.navigationButton} ${styles.nextButton}`}
                disabled={activeIndex === photoCount - 1}
                onClick={() => mainSwiper?.slideNext()}
                type="button"
              >
                <ArrowIcon direction="right" />
              </button>
            </>
          )}
        </div>

        {photoCount > 1 && (
          <div
            aria-label="Seleccionar una foto"
            className={styles.thumbnailRail}
            role="group"
          >
            {images.map((image, index) => {
              const thumbnailAlt =
                image.alt?.trim() ||
                `${property.title}, foto ${index + 1} de ${photoCount}`;

              return (
                <button
                  ref={(node) => {
                    thumbnailRefs.current[index] = node;
                  }}
                  aria-label={`Mostrar ${thumbnailAlt}`}
                  aria-pressed={activeIndex === index}
                  className={styles.thumbnailButton}
                  key={image.id || `${getMediaUrl(image, "thumbnail")}-${index}`}
                  onClick={() => goToPhoto(index)}
                  type="button"
                >
                  <Image
                    alt=""
                    className={styles.thumbnailImage}
                    height={72}
                    sizes="88px"
                    src={getMediaUrl(image, "thumbnail")}
                    width={96}
                  />
                  <span aria-hidden="true" className={styles.thumbnailNumber}>
                    {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </PhotoSwipeGallery>
    </section>
  );
}
