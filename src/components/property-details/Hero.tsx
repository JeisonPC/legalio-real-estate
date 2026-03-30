import React from "react";
import PropertiesTitle3 from "./PropertiesTitle3";
import Slide2 from "./Slide2";
import { Property } from "@/payload-types";

export default function Hero({ property }: { property: Property }) {
    return (
        <>
            <div className="properties-title">
                <PropertiesTitle3 property={property} />
            </div>
            <div className="right">
                <Slide2 property={property} />
            </div>
        </>
    );
}
