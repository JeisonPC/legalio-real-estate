"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { City, Property } from "@/payload-types";
import DropdownSelect2 from "./DropdownSelect2";
import AdvanceSearchDefault from "./AdvanceSearchDefault";
import {
  ALL_BATHROOMS_OPTION,
  ALL_BEDROOMS_OPTION,
  ALL_CITIES_OPTION,
  ALL_GARAGES_OPTION,
  MAX_PRICE_OPTION,
  MAX_SIZE_OPTION,
  MIN_SIZE_OPTION,
  buildPropertyFilterOptions,
} from "@/lib/properties/filterOptions";

interface SidebarFilterDefaultProps {
  cities: City[];
  properties?: Property[];
}

function isAllCitiesValue(value: string) {
  return value === "Todas" || value === ALL_CITIES_OPTION;
}

export default function SidebarFilterDefault({
  cities,
  properties = [],
}: SidebarFilterDefaultProps) {
  const router = useRouter();
  const ddContainer = useRef<HTMLDivElement>(null);
  const advanceBtnRef = useRef<HTMLDivElement>(null);

  const [businessType, setBusinessType] = useState<"arriendo" | "venta">(
    "arriendo",
  );
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [price, setPrice] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [garages, setGarages] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const filterOptions = useMemo(
    () => buildPropertyFilterOptions(properties, cities),
    [properties, cities],
  );

  const buildSearchParams = (type = businessType) => {
    const params = new URLSearchParams();

    params.set("businessType", type);

    if (keyword.trim()) params.set("q", keyword.trim());
    if (city && !isAllCitiesValue(city)) params.set("city", city);
    if (bedrooms && bedrooms !== ALL_BEDROOMS_OPTION) {
      params.set("bedrooms", bedrooms);
    }
    if (bathrooms && bathrooms !== ALL_BATHROOMS_OPTION) {
      params.set("bathrooms", bathrooms);
    }
    if (garages && garages !== ALL_GARAGES_OPTION) {
      params.set("garages", garages);
    }
    if (price && price !== MAX_PRICE_OPTION) params.set("price", price);
    if (minSize && minSize !== MIN_SIZE_OPTION) params.set("minSize", minSize);
    if (maxSize && maxSize !== MAX_SIZE_OPTION) params.set("maxSize", maxSize);
    if (features.length > 0) params.set("features", features.join(","));

    return params;
  };

  const goToProperties = (type = businessType) => {
    const params = buildSearchParams(type);
    router.push(`/propiedades?${params.toString()}`);
  };

  const handleBusinessTypeChange = (type: "arriendo" | "venta") => {
    setBusinessType(type);
    goToProperties(type);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ddContainer.current &&
        !ddContainer.current.contains(event.target as Node) &&
        advanceBtnRef.current &&
        !advanceBtnRef.current.contains(event.target as Node)
      ) {
        ddContainer.current.classList.remove("show");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    goToProperties();
  };

  const handleFeatureChange = (feature: string) => {
    setFeatures((currentFeatures) =>
      currentFeatures.includes(feature)
        ? currentFeatures.filter((item) => item !== feature)
        : [...currentFeatures, feature],
    );
  };

  return (
    <div className="flat-tab flat-tab-form">
      <div className="tf-container">
        <ul
          className="nav-tab-form style-1 justify-content-center"
          aria-label="Tipo de negocio"
        >
          <li className="nav-tab-item text-title fw-6">
            <button
              type="button"
              aria-pressed={businessType === "arriendo"}
              className={`nav-link-item ${businessType === "arriendo" ? "active" : ""}`}
              onClick={() => handleBusinessTypeChange("arriendo")}
            >
              Arriendo
            </button>
          </li>
          <li className="nav-tab-item text-title fw-6">
            <button
              type="button"
              aria-pressed={businessType === "venta"}
              className={`nav-link-item ${businessType === "venta" ? "active" : ""}`}
              onClick={() => handleBusinessTypeChange("venta")}
            >
              Venta
            </button>
          </li>
        </ul>

        <div className="wg-filter">
          <div className="widget-content-inner active">
            <div className="form-title">
              <div className="wrap-fill tf-grid-layout lg-col-4 md-col-2">
                <form className="w-full" onSubmit={handleSubmit}>
                  <label
                    htmlFor="lookingFor"
                    className="text-button text_primary-color mb_8"
                  >
                    Busqueda
                  </label>
                  <fieldset>
                    <input
                      type="text"
                      placeholder="Buscar por nombre"
                      id="lookingFor"
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                    />
                  </fieldset>
                </form>

                <div>
                  <div className="text-button text_primary-color mb_8">
                    Ciudad
                  </div>
                  <DropdownSelect2
                    options={filterOptions.cityOptions}
                    defaultOption="Ciudad"
                    onChange={setCity}
                  />
                </div>

                <div>
                  <div className="text-button text_primary-color mb_8">
                    Habitaciones
                  </div>
                  <DropdownSelect2
                    options={filterOptions.bedroomOptions}
                    defaultOption="Habitaciones"
                    onChange={setBedrooms}
                  />
                </div>

                <div>
                  <div className="text-button text_primary-color mb_8">
                    Precio
                  </div>
                  <DropdownSelect2
                    options={filterOptions.priceOptions}
                    defaultOption="Precio"
                    onChange={setPrice}
                  />
                </div>
              </div>

              <div className="wrap-btn">
                <div
                  className="btn-filter show-form"
                  onClick={() => ddContainer.current?.classList.toggle("show")}
                  ref={advanceBtnRef}
                >
                  <div className="icons">
                    <i className="icon-Faders"></i>
                  </div>
                </div>

                <button
                  type="button"
                  className="tf-btn btn-px-28 btn-bg-1"
                  onClick={() => handleSubmit()}
                >
                  <span>Buscar </span>
                  <span className="bg-effect"></span>
                </button>
              </div>
            </div>
          </div>

          <AdvanceSearchDefault
            ddContainer={ddContainer as React.RefObject<HTMLDivElement>}
            filterOptions={filterOptions}
            features={features}
            onBathroomsChange={setBathrooms}
            onGaragesChange={setGarages}
            onMinSizeChange={setMinSize}
            onMaxSizeChange={setMaxSize}
            onFeatureChange={handleFeatureChange}
          />
        </div>
      </div>
    </div>
  );
}
