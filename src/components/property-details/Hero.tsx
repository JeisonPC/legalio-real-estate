import React from "react";
import PropertiesTitle3 from "./PropertiesTitle3";
import Slide2 from "./Slide2";

type Property = {
    id: number;
    imgSrc: string;
    alt?: string;
    address: string;
    title: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    propertyType: string;
    type: string;
    price: number;
};

export default function Hero({ property }: { property: Property }) {
    return (
        <>
            <div className="properties-title">
                <PropertiesTitle3 property={property} />
            </div>
            <div className="right">
                <Slide2 />
            </div>
        </>
    );
}
