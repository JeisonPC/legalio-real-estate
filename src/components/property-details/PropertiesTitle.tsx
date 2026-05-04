import { Property } from "@/payload-types";
import Link from "next/link";
import React from "react";

export default function PropertiesTitle({ property }: { property: Property }) {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap_12">
        <div>
          <div className="wrap-tag d-flex gap_8 mb_12">
            <div
              className={`tag ${
                property.businessType === "venta"
                  ? "sale"
                  : property.businessType === "arriendo"
                    ? "rent"
                    : property.businessType
              }  text-button-small fw-6 text_primary-color`}
            >
              {property.businessType}
            </div>
            <div className="tag categories text-button-small fw-6 text_primary-color">
              {property.propertyType}
            </div>
          </div>
          <h4>{property.title}</h4>
        </div>
        <h4 className="price">
          {property.price}
          <span className="text_secondary-color text-body-1">
            {property.businessType === "venta" ? "/Sqft" : "/month"}
          </span>
        </h4>
      </div>
      <div className="wrap-info d-flex justify-content-between align-items-end">
        <div>
          <div className="text-body-default mb_12">Features:</div>
          <ul className="info d-flex">
            <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
              <i className="icon-Bed"></i>
              {property.bedrooms}
              habitaciones
            </li>
            <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
              <i className="icon-Bathstub"></i>
              {property.bathrooms} Baños
            </li>
            <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
              <i className="icon-Ruler"></i>
              {property.area} área
            </li>
          </ul>
        </div>
        <ul className="list-action d-flex gap_16">
          <li>
            <Link href="#" className="">
              <i className="icon-ArrowsLeftRight"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="icon icon-Heart"></span>
            </Link>
          </li>
          <li>
            {" "}
            <Link href="#" className="">
              <i className="icon-ShareNetwork"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
