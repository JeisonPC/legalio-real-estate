"use client";
import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import Image from "next/image";
import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";

export default function Hero() {
  return (
    <div className="page-title style-1 sw-layout">
      <div className="thumbs effect-content-slide">
        {/* <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".nav-next-layout",
            prevEl: ".nav-prev-layout",
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={10}
          loop={true}
          className="swiper"
        >
          <SwiperSlide>
            <div className="slide-inner effect-img-zoom ">
              <Image
                className="img-zoom"
                src="/assets/images/page-title/page-title-2.jpg"
                width={1920}
                height={680}
                alt="page-title"
                priority
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-inner effect-img-zoom ">
              <Image
                className="img-zoom"
                src="/assets/images/page-title/page-title-3.jpg"
                width={1920}
                height={680}
                alt="page-title"
                priority
              />
            </div>
          </SwiperSlide>
          <div className="sw-button nav-prev-layout">
            <i className="icon-CaretLeft"></i>
          </div>
          <div className="sw-button nav-next-layout">
            <i className="icon-CaretRight"></i>
          </div>
        </Swiper> */}
      </div>

      <div className="searching-home">
        <SidebarFilterDefault />
      </div>
    </div>
  );
}
