"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState, useReducer } from "react";
import { initialState, reducer } from "@/context/propertiesFilterReduce";
import Pagination from "@/components/common/Pagination";
import type { City, Property } from "@/payload-types";
import SidebarFilter1 from "../common/SidebarFilter1";
import Map from "../common/Map";
import DropdownSelect2 from "../common/DropdownSelect2";
import Link from "next/link";

function parseSizeValue(val: string) {
  if (val === "Min (SqFt)" || val === "Max (SqFt)") return val;
  return val.replace(/[^0-9]/g, "");
}

function getMainImage(property: Property) {
  if (
    Array.isArray(property.images) &&
    property.images.length > 0 &&
    typeof property.images[0] === "object" &&
    property.images[0]?.url
  ) {
    return property.images[0].url;
  }

  return "/assets/images/placeholder.jpg";
}

function getSecondImage(property: Property) {
  if (
    Array.isArray(property.images) &&
    property.images.length > 1 &&
    typeof property.images[1] === "object" &&
    property.images[1]?.url
  ) {
    return property.images[1].url;
  }

  return null;
}

function getBusinessLabel(property: Property) {
  return property.businessType === "venta" ? "Venta" : "Arriendo";
}

function getBusinessClass(property: Property) {
  return property.businessType === "venta" ? "sale" : "rent";
}

export default function Properties1({
  properties,
  cities,
}: {
    cities: City[];
  properties: Property[];
}) {
  console.log("properties", properties);
  const ddContainer = useRef<HTMLDivElement>(null);
  const advanceBtnRef = useRef<HTMLDivElement>(null);

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

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    bedrooms,
    bathrooms,
    garages,
    city,
    price,
    minSize,
    maxSize,
    features,
    filtered,
    sortingOption,
    sorted,
    currentPage,
    itemPerPage,
  } = state;
  console.log("filtered", filtered);
  console.log("sorted", sorted);
  const visibleProperties = sorted.length ? sorted : properties;

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    let filteredList: Property[] = properties;
    console.log("filteredList before dispatch", filteredList);

    if (city && city !== "Todas las Ciudades") {
      filteredList = filteredList.filter((p) => {
        const cityName =
          typeof p.city === "object" && p.city !== null && "name" in p.city
            ? p.city.name
            : "";

        return cityName === city;
      });
    }

    if (bedrooms && bedrooms !== "Cualquiera") {
      if (bedrooms === "4+") {
        filteredList = filteredList.filter((p) => Number(p.bedrooms) >= 4);
      } else {
        const bedroomNum = parseInt(bedrooms, 10);
        filteredList = filteredList.filter((p) => p.bedrooms === bedroomNum);
      }
    }

    if (bathrooms && bathrooms !== "Cualquiera") {
      if (bathrooms === "4+") {
        filteredList = filteredList.filter((p) => Number(p.bathrooms) >= 4);
      } else {
        const bathroomNum = parseInt(bathrooms, 10);
        filteredList = filteredList.filter((p) => p.bathrooms === bathroomNum);
      }
    }

    if (garages && garages !== "Any Garages") {
      if (garages === "3+") {
        filteredList = filteredList.filter((p) => Number(p.garages) >= 3);
      } else {
        const garageNum = parseInt(garages, 10);
        filteredList = filteredList.filter((p) => p.garages === garageNum);
      }
    }

    if (price && price !== "Precio Max.") {
      let maxPrice = 0;

      if (price.startsWith("Menos de $")) {
        maxPrice = parseInt(price.replace("Menos de $", "").replace(/,/g, ""), 10);
        filteredList = filteredList.filter((p) => Number(p.price) <= maxPrice);
      } else if (price.startsWith("$")) {
        maxPrice = parseInt(price.replace("$", "").replace(/,/g, ""), 10);
        filteredList = filteredList.filter((p) => Number(p.price) <= maxPrice);
      } else if (price.startsWith("Más de $")) {
        maxPrice = parseInt(price.replace("Más de $", "").replace(/,/g, ""), 10);
        filteredList = filteredList.filter((p) => Number(p.price) > maxPrice);
      }
    }

    if (minSize && minSize !== "Min (SqFt)") {
      const min = parseInt(parseSizeValue(minSize), 10);
      if (!isNaN(min)) {
        filteredList = filteredList.filter(
          (p) => p.area !== undefined && Number(p.area) >= min,
        );
      }
    }

    if (maxSize && maxSize !== "Max (SqFt)") {
      const max = parseInt(parseSizeValue(maxSize), 10);
      if (!isNaN(max)) {
        filteredList = filteredList.filter(
          (p) => p.area !== undefined && Number(p.area) <= max,
        );
      }
    }

    if (features && features.length > 0) {
      filteredList = filteredList.filter((p) =>
        Array.isArray(p.features)
          ? features.every((selected) =>
              p.features?.some((item) => item?.value === selected),
            )
          : false,
      );
    }

    if (searchKeyword && searchKeyword.trim() !== "") {
      const kw = searchKeyword.trim().toLowerCase();

      filteredList = filteredList.filter((p) => {
        const cityName =
          typeof p.city === "object" &&
          p.city !== null &&
          "name" in p.city &&
          typeof p.city.name === "string"
            ? p.city.name.toLowerCase()
            : "";

        return (
          (p.title && p.title.toLowerCase().includes(kw)) ||
          (p.address && p.address.toLowerCase().includes(kw)) ||
          cityName.includes(kw)
        );
      });
    }

    dispatch({ type: "SET_FILTERED", payload: filteredList });
  }, [
    properties,
    bedrooms,
    bathrooms,
    garages,
    city,
    price,
    minSize,
    maxSize,
    features,
    searchKeyword,
  ]);

  useEffect(() => {
    const sortedList = [...filtered];
    if (sortingOption === "Precio Ascendiente") {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "Precio Descendiente") {
      sortedList.sort((a, b) => b.price - a.price);
    }
    dispatch({ type: "SET_SORTED", payload: sortedList });
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  const handleFeatureChange = (feature: string) => {
    const updated = features.includes(feature)
      ? features.filter((elm) => elm !== feature)
      : [...features, feature];
    dispatch({ type: "SET_FEATURES", payload: updated });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleAdvancedFilter = () => {
    if (ddContainer.current) {
      ddContainer.current.classList.toggle("show");
    }
  };

  const allProps = {
    city,
    setCity: (newCity: string) =>
      dispatch({ type: "SET_CITY", payload: newCity }),
    bedrooms,
    setBedrooms: (newBedrooms: string) =>
      dispatch({ type: "SET_BEDROOMS", payload: newBedrooms }),
    bathrooms,
    setBathrooms: (newBathrooms: string) =>
      dispatch({ type: "SET_BATHROOMS", payload: newBathrooms }),
    garages,
    setGarages: (newGarages: string) =>
      dispatch({ type: "SET_GARAGES", payload: newGarages }),
    price,
    setPrice: (newPrice: string) =>
      dispatch({ type: "SET_PRICE", payload: newPrice }),
    minSize,
    setMinSize: (newMinSize: string) =>
      dispatch({ type: "SET_MINSIZE", payload: newMinSize }),
    maxSize,
    setMaxSize: (newMaxSize: string) =>
      dispatch({ type: "SET_MAXSIZE", payload: newMaxSize }),
    features,
    setFeatures: (newFeature: string) => {
      const updated = features.includes(newFeature)
        ? features.filter((elm) => elm !== newFeature)
        : [...features, newFeature];
      dispatch({ type: "SET_FEATURES", payload: updated });
    },
  };

  return (
    <>
      <div className="flat-map">
        <div className="mapbox-3">
          <Map sorted={visibleProperties as []} />
        </div>
        <div className="tf-container">
          <SidebarFilter1
            cities={cities}
            allProps={allProps}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            handleSearch={handleSearch}
            handleFeatureChange={handleFeatureChange}
            ddContainer={ddContainer as React.RefObject<HTMLDivElement>}
            advanceBtnRef={advanceBtnRef as React.RefObject<HTMLDivElement>}
            toggleAdvancedFilter={toggleAdvancedFilter}
          />
        </div>
      </div>

      <div className="section-properties tf-spacing-1">
        <div className="tf-container">
          <div className="box-title mb_40">
            <div>
              <ul className="breadcrumb style-1 text-button fw-4 mb_4">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>With Top Map</li>
              </ul>
              <h4>With Top Map</h4>
            </div>

            <div className="right d-flex gap_12">
              <ul
                className="nav-tab-filter align-items-center group-layout d-flex gap_12"
                role="tablist"
              >
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#gridLayout"
                    className="btn-layout grid nav-link-item active"
                    data-bs-toggle="tab"
                  >
                    <i className="icon-SquaresFour"></i>
                  </a>
                </li>
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#listLayout"
                    className="nav-link-item btn-layout list"
                    data-bs-toggle="tab"
                  >
                    <i className="icon-Rows"></i>
                  </a>
                </li>
              </ul>

              <DropdownSelect2
                onChange={(value) =>
                  dispatch({
                    type: "SET_SORTING_OPTION",
                    payload: value,
                  })
                }
                addtionalParentClass="list-sort"
                options={[
                  "Ordenar por (Predeterminado)",
                  "Precio Ascendiente",
                  "Precio Descendiente",
                ]}
              />
            </div>
          </div>

          <div className="flat-animate-tab">
            <div className="tab-content">
              <div
                className="tab-pane active show"
                id="gridLayout"
                role="tabpanel"
              >
                <div className="tf-grid-layout lg-col-3 md-col-2">
                  {sorted
                    .slice(
                      (currentPage - 1) * itemPerPage,
                      currentPage * itemPerPage,
                    )
                    .map((property) => (
                      <div
                        key={property.id}
                        className="card-house style-default hover-image"
                        data-id={property.id}
                      >
                        <div className="img-style mb_20">
                          <Image
                            src={getMainImage(property)}
                            width={410}
                            height={308}
                            alt={property.title}
                          />

                          <div className="wrap-tag d-flex gap_8 mb_12">
                            <div
                              className={`tag ${getBusinessClass(property)} text-button-small fw-6 text_primary-color`}
                            >
                              {getBusinessLabel(property)}
                            </div>

                            <div className="tag categories text-button-small fw-6 text_primary-color">
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
                              {property.businessType === "venta"
                                ? ""
                                : "/month"}
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
                              {property.bedrooms} Bed
                            </li>
                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                              <i className="icon-Bathtub"></i>
                              {property.bathrooms} Bath
                            </li>
                            <li
                              className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                              suppressHydrationWarning
                            >
                              <i className="icon-Ruler"></i>
                              {property.area
                                ? property.area.toLocaleString()
                                : "0"}{" "}
                              Sqft
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="tab-pane" id="listLayout" role="tabpanel">
                <div className="wrap-list d-grid gap_30">
                  {visibleProperties
                    .slice((currentPage - 1) * 5, currentPage * 5)
                    .map((property) => (
                      <div
                        className="card-house style-list v2"
                        data-id={property.id}
                        key={property.id}
                      >
                        <div className="wrap-img">
                          <Link
                            href={`/property-details-1/${property.id}`}
                            className="img-style"
                          >
                            <Image
                              src={getMainImage(property)}
                              width={392}
                              height={260}
                              alt={property.title}
                            />
                          </Link>

                          {getSecondImage(property) && (
                            <Link
                              href={`/property-details-1/${property.id}`}
                              className="img-style"
                            >
                              <Image
                                src={getSecondImage(property)!}
                                width={392}
                                height={260}
                                alt={property.title}
                              />
                            </Link>
                          )}
                        </div>

                        <div className="content">
                          <div className="d-flex align-items-center gap_6 top mb_16 flex-wrap justify-content-between">
                            <h4 className="price" suppressHydrationWarning>
                              ${property.price.toLocaleString()}
                              <span className="text_secondary-color text-body-default">
                                {property.businessType === "venta"
                                  ? ""
                                  : "/month"}
                              </span>
                            </h4>

                            <div className="wrap-tag d-flex gap_8">
                              <div
                                className={`tag ${getBusinessClass(property)} text-button-small fw-6 text_primary-color`}
                              >
                                {getBusinessLabel(property)}
                              </div>

                              <div className="tag categories text-button-small fw-6 text_primary-color">
                                {property.propertyType}
                              </div>
                            </div>
                          </div>

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
                              {property.bedrooms} Bed
                            </li>
                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                              <i className="icon-Bathtub"></i>
                              {property.bathrooms} Bath
                            </li>
                            <li
                              className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                              suppressHydrationWarning
                            >
                              <i className="icon-Ruler"></i>
                              {property.area
                                ? property.area.toLocaleString()
                                : "0"}{" "}
                              Sqft
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              setPage={(value) =>
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: value,
                })
              }
              itemLength={visibleProperties.length}
              itemPerPage={itemPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
