import React from "react";
import MapComponent from "../common/Map2";
import { Property } from "@/payload-types";

export default function Location({ property }: { property: Property }) {
  const lng = property.coordinates?.[0] ?? 0;
  const lat = property.coordinates?.[1] ?? 0;
  return (
    <>
      <h5 className="properties-title mb_20">Ubicación</h5>
      <div className="heading d-flex align-items-center justify-content-between flex-wrap gap_12 mb_16">
        <div className=" d-flex align-items-center gap_4 text-button fw-7 text_primary-color flex-wrap">
          <i className="icon-MapPin"></i>4600 Sunset Blvd, Los Angeles, CA 90027
        </div>
        <a
          href="#"
          className="hover-underline-link text-button fw-7 text_primary-color"
        >
          Get Directions
        </a>
      </div>
      <div className="wrap-map">
        <MapComponent
          property={{
            ...property,
            lat: lat,
            long: lng,
          }}
        />
      </div>
    </>
  );
}
