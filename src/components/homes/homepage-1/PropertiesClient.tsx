"use client";

import React, { useEffect, useState } from "react";
import type { Property } from "@/payload-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export default function PropertiesClient({
  properties,
}: {
  properties: Property[];
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const items = properties.slice(0, 6);

  const renderCard = (property: Property) => {
    const firstImage =
      Array.isArray(property.images) && property.images.length > 0
        ? property.images[0]
        : null;

    const imageUrl =
      typeof firstImage === "object" && firstImage !== null
        ? firstImage.cloudinarySecureUrl ||
          firstImage.url ||
          "/assets/images/placeholder.jpg"
        : "/assets/images/placeholder.jpg";

    const businessLabel =
      property.businessType === "venta" ? "Venta" : "Arriendo";

    const businessClass = property.businessType === "venta" ? "sale" : "rent";

    return (
      <div
        key={property.id}
        className="card-house style-default hover-image"
        data-id={property.id}
      >
        <div className="img-style mb_20">
          <Image
            src={imageUrl}
            style={{ height: "258px", objectFit: "cover" }}
            width={410}
            height={258}
            alt={property.title}
          />
          <div className="wrap-tag d-flex gap_8 mb_12">
            <div
              className={`tag ${businessClass} text-button-small fw-6 text_primary-color`}
            >
              {businessLabel}
            </div>
            <div className="tag property-type text-button-small fw-6 text_primary-color">
              {property.propertyType}
            </div>
          </div>

          <Link
            href={`/property-details-1/${property.id}`}
            className="overlay-link"
          />

          <div className="wishlist">
            <div className="hover-tooltip tooltip-left box-icon">
              <span className="icon icon-Heart"></span>
              <span className="tooltip">Add to Wishlist</span>
            </div>
          </div>
        </div>

        <div className="content">
          <h4 className="price mb_12" suppressHydrationWarning>
            ${property.price.toLocaleString()}
            <span className="text_secondary-color text-body-default">
              {property.businessType === "venta" ? "" : "/mes"}
            </span>
          </h4>

          <Link
            href={`/property-details-1/${property.id}`}
            className="title mb_8 h5 link text_primary-color"
          >
            {property.title}
          </Link>

          <p>{property.address}</p>

          <ul className="info d-flex">
            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
              <i className="icon-Bed"></i>
              {property.bedrooms} Hab
            </li>
            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
              <i className="icon-Bathtub"></i>
              {property.bathrooms} Baños
            </li>
            <li
              className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
              suppressHydrationWarning
            >
              <i className="icon-Ruler"></i>
              {property.area ? property.area.toLocaleString() : "0"} m²
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="section-features-property-4 tf-spacing-1 pt-0">
      <div className="tf-container">
        <div className="heading-section justify-content-center text-center mb_46 mt_24">
          <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
            Propiedades destacadas
          </span>
          <h3 className="split-text effect-blur-fade">
            Encuentra tu propiedad ideal
          </h3>
        </div>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            spaceBetween={15}
            slidesPerView={1}
            pagination={{ clickable: true, el: ".sw-dots" }}
            className="tf-sw-mobile bg_1"
          >
            {items.map((property) => (
              <SwiperSlide key={property.id}>
                {renderCard(property)}
              </SwiperSlide>
            ))}
            <div className="sw-dots style-1 sw-pagination-mb mt_24 justify-content-center d-flex d-md-none"></div>
          </Swiper>
        ) : (
          <div className="tf-sw-mobile bg_1">
            <div className="tf-grid-layout-md lg-col-3 md-col-2">
              {items.map((property) => (
                <div className="swiper-slide" key={property.id}>
                  {renderCard(property)}
                </div>
              ))}
            </div>
          </div>
        )}

        <Link
          href="/listing-half-map-grid"
          className="tf-btn btn-bg-1 mx-auto btn-px-32 scrolling-effect effectBottom"
        >
          <span>Ver todas las propiedades</span>
          <span className="bg-effect"></span>
        </Link>
      </div>
    </div>
  );
}
