import { Property } from "@/payload-types";
import React from "react";
import SharePropertyButton from "./SharePropertyButton";

export default function PropertiesTitle3({ property }: { property: Property }) {
  const capitalizeFirst = (value?: string | null) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <>
      <div>
        <div className="wrap-tag d-flex justify-content-between gap_12 mb_16">
          <div className="flex-row d-flex gap_8">
            <div
              className={`tag ${
                property.businessType === "venta"
                  ? "sale"
                  : property.businessType === "arriendo"
                    ? "rent"
                    : property.businessType
              }  text-title fw-6 text_primary-color`}
            >
              {capitalizeFirst(property.businessType)}
            </div>
            <div className="tag categories text-title fw-6 text_primary-color">
              {capitalizeFirst(property.propertyType)}
            </div>
          </div>
          <ul className="list-action d-flex gap_16">
            <li>
              <SharePropertyButton title={property.title} />
            </li>
          </ul>
        </div>
        <h2>{property.title}</h2>
        {/* <ul className="list-action d-flex gap_16">
          <li className="compare">
            <Link href="#" className="gap_8">
              <i className="icon-ArrowsLeftRight"></i>
              <span className="text-button">Compare</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="icon icon-Heart"></span>
            </Link>
          </li>
          <li>
            <Link href="#" className="">
              <i className="icon-ShareNetwork"></i>
            </Link>
          </li>
        </ul> */}
      </div>
      <div>
        <h5 className="mb_16">Precio:</h5>
        <h2 className="price">
          {property.price}
          <span className="text_secondary-color text-body-1">
            {property.businessType === "arriendo" && "/mes"}
          </span>
        </h2>
      </div>
    </>
  );
}
