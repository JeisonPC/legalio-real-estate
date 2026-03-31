"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bedroomOptions, priceOptions, cityOptions } from "@/data/optionfilter";
import DropdownSelect2 from "./DropdownSelect2";
import AdvanceSearchDefault from "./AdvanceSearchDefault";

export default function SidebarFilterDefault() {
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

  const handleBusinessTypeChange = (type: "arriendo" | "venta") => {
    setBusinessType(type);

    const params = new URLSearchParams();

    params.set("businessType", type);

    if (keyword.trim()) params.set("q", keyword.trim());
    if (city) params.set("city", city);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (price) params.set("price", price);

    router.push(`/listing-half-map-grid?${params.toString()}`);
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

    const params = new URLSearchParams();

    params.set("businessType", businessType);

    if (keyword.trim()) params.set("q", keyword.trim());
    if (city) params.set("city", city);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (price) params.set("price", price);

    router.push(`/listing-half-map-grid?${params.toString()}`);
  };

  return (
    <div className="flat-tab flat-tab-form">
      <div className="tf-container">
        <ul
          className="nav-tab-form style-1 justify-content-center"
          role="tablist"
        >
          <li className="nav-tab-item text-title fw-6" role="presentation">
            <button
              type="button"
              className={`nav-link-item ${businessType === "arriendo" ? "active" : ""}`}
              onClick={() => handleBusinessTypeChange("arriendo")}
            >
              Arriendo
            </button>
          </li>
          <li className="nav-tab-item text-title fw-6" role="presentation">
            <button
              type="button"
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
                    Búsqueda
                  </label>
                  <fieldset>
                    <input
                      type="text"
                      placeholder="Buscar por nombre"
                      id="lookingFor"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </fieldset>
                </form>

                <div>
                  <div className="text-button text_primary-color mb_8">
                    Ciudad
                  </div>
                  <DropdownSelect2
                    options={cityOptions}
                    defaultOption="Ciudad"
                    onChange={(value) => setCity(value)}
                  />
                </div>

                <div>
                  <div className="text-button text_primary-color mb_8">
                    Habitaciones
                  </div>
                  <DropdownSelect2
                    options={bedroomOptions}
                    defaultOption="Habitaciones"
                    onChange={(value) => setBedrooms(value)}
                  />
                </div>

                <div>
                  <div className="text-button text_primary-color mb_8">
                    Precio
                  </div>
                  <DropdownSelect2
                    options={priceOptions}
                    defaultOption="Precio"
                    onChange={(value) => setPrice(value)}
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
          />
        </div>
      </div>
    </div>
  );
}
