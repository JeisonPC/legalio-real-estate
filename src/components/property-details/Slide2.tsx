import Image from "next/image";
import React, { useState } from "react";
import { Autoplay, EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import ModalVideo from "../common/ModalVideo";
import { Media, Property } from "@/payload-types";
import Link from "next/link";

export default function Slide2({ property }: { property: Property }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const images = (property?.images ?? []).filter(
    (image): image is Media =>
      typeof image === "object" && image !== null && "url" in image,
  );

  const getImageUrl = (img: Media) => img.url || "/images/placeholder.jpg";

  const thumbProps = {
    spaceBetween: 14,
    slidesPerView: "auto" as const,
    freeMode: true,
    watchSlidesProgress: true,
    direction: "vertical" as const,
    breakpoints: {
      375: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      500: {
        slidesPerView: "auto" as const,
      },
    },
  };
  const props = {
    spaceBetween: 16,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  };

  console.log("images in Slide2", images);
  console.log("first image", images[0]);
  console.log("first image width/height", images[0]?.width, images[0]?.height);

  function getYouTubeVideoId(url?: string | null): string | undefined {
    if (!url) return undefined;

    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);
    return match?.[1];
  }

  function getYouTubeEmbedUrl(url?: string | null): string | undefined {
    const videoId = getYouTubeVideoId(url);
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
      : undefined;
  }

  const embedUrl = getYouTubeEmbedUrl(property.videoUrl);
  return (
    <>
      <PhotoSwipeGallery>
        <div className="wrap-thumb">
          <Swiper
            modules={[Thumbs, Autoplay, EffectFade, Navigation]}
            thumbs={{ swiper: thumbsSwiper }}
            navigation={{
              prevEl: ".sw-thumbs-prev",
              nextEl: ".sw-thumbs-next",
            }}
            className="swiper sw-single"
            {...props}
          >
            {images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="thumb-main">
                  <Item
                    original={getImageUrl(image)}
                    thumbnail={getImageUrl(image)}
                    width={image.width || 1200}
                    height={image.height || 675}
                  >
                    {({ ref, open }) => (
                      <div className="thumb-main">
                        <Link onClick={open} data-fancybox="gallery" href={""}>
                          <Image
                            alt={image.alt}
                            src={getImageUrl(image)}
                            ref={ref}
                            width={image.width || 1200}
                            height={image.height || 675}
                            priority
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </Link>
                        <div className="wrap-btn d-flex gap_10">
                          <div className="widget-video">
                            <Link
                              onClick={() => {
                                if (embedUrl) setIsOpen(true);
                              }}
                              data-fancybox="gallery2"
                              className="tf-btn tf-btn btn-bg-1 popup-youtube"
                              href={""}
                            >
                              <span className="d-flex align-items-center gap_8">
                                <i className="icon-PlayCircle"></i>
                                Reproducir Video
                              </span>
                              <span className="bg-effect"></span>
                            </Link>
                          </div>
                          <Link
                            onClick={open}
                            data-fancybox="gallery"
                            className="tf-btn btn-bg-1"
                            href={""}
                          >
                            <span className="d-flex align-items-center gap_8">
                              <i className="icon-Image"></i>
                              Ver todas las fotos
                            </span>
                            <span className="bg-effect"></span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </Item>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="sw-button sw-thumbs-prev lg-hide">
          <i className="icon-CaretLeft"></i>
        </div>
        <div className="sw-button sw-thumbs-next lg-hide">
          <i className="icon-CaretRight"></i>
        </div>
        <div className="wrap-pagi">
          <Swiper
            {...thumbProps}
            modules={[Thumbs]}
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            className="swiper thumbs-sw-pagi"
          >
            {images.map((thumb, index) => (
              <SwiperSlide key={index}>
                <div className="image-detail">
                  <Image
                    alt={thumb.alt}
                    src={getImageUrl(thumb)}
                    width={100}
                    height={100}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </PhotoSwipeGallery>
      <ModalVideo setIsOpen={setIsOpen} isOpen={isOpen} src={embedUrl} />
    </>
  );
}
