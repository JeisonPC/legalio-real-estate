"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import type { Media } from "@/payload-types";
import Link from "next/link";

type CityCard = {
  id: number;
  name: string;
  slug: string;
  image?: number | Media | null;
  propertiesCount: number;
};

function isMedia(value: number | Media | null | undefined): value is Media {
  return typeof value === "object" && value !== null;
}

export default function LocationSlider({ cities }: { cities: CityCard[] }) {
  return (
    <div className="section-location tf-spacing-1 pt-0">
      <div className="tf-container w-1830">
        <div className="heading-section justify-content-center text-center mb_46">
          <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
            Explora por Ciudad
          </span>
          <h3 className="split-text effect-blur-fade">
            Ubicación de las propiedades
          </h3>
        </div>

        <div className="position-relative">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={4}
            spaceBetween={30}
            navigation={{
              nextEl: ".nav-next-layout",
              prevEl: ".nav-prev-layout",
            }}
            pagination={{
              el: ".sw-pagination-layout",
              clickable: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 20 },
              1200: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="scrolling-effect effectLeft"
          >
            {cities.map((city) => {
              const imageUrl = isMedia(city.image)
                ?
                city.image.url ||
                "/assets/images/section/location-7.jpg"
                : "/assets/images/section/location-7.jpg";

              return (
                <SwiperSlide key={city.id}>
                  <div className="location-item style-1 hover-image h-full">
                    <Link
                      href="#"
                      className="img-style block w-full overflow-hidden h-full"
                    >
                      <Image
                        width={428}
                        height={590}
                        src={imageUrl}
                        alt={city.name}
                        className="w-full h-full object-contain"
                      />
                    </Link>
                    <div className="content">
                      <Link href="#" className="mb_8 h5 text_primary-color">
                        {city.name}
                      </Link>
                      <p className="text-caption-1">
                        {city.propertiesCount} Propiedades
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="sw-dots style-1 sw-pagination-layout text-center mt_24 d-xl-none"></div>
          <div className="sw-button nav-prev-layout xl-hide">
            <i className="icon-CaretLeft"></i>
          </div>
          <div className="sw-button nav-next-layout xl-hide">
            <i className="icon-CaretRight"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
