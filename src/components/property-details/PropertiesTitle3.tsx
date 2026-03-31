import { Property } from "@/payload-types";
import React from "react";

export default function PropertiesTitle3({ property }: { property: Property }) {
    return (
        <>
            <div>
                <div className="wrap-tag d-flex gap_12 mb_16">
                    <div
                        className={`tag ${
                            property.businessType === "venta"
                                ? "sale"
                                : property.businessType === "arriendo"
                                ? "rent"
                                : property.businessType
                        }  text-title fw-6 text_primary-color`}
                    >
                        For {property.businessType}
                    </div>
                    <div className="tag categoreis text-title fw-6 text_primary-color">
                        {property.propertyType}
                    </div>
                </div>
                <h2>{property.title}</h2>
                <ul className="list-action d-flex gap_16">
                    {/* <li className="compare">
                        <a href="#" className="gap_8">
                            <i className="icon-ArrowsLeftRight"></i>
                            <span className="text-button">Compare</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon icon-Heart"></span>
                        </a>
                    </li> */}
                    <li>
                        <a href="#" className="">
                            <i className="icon-ShareNetwork"></i>
                        </a>
                    </li>
                </ul>
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
