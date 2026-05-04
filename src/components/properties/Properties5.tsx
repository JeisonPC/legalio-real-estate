"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useReducer } from "react";
import { initialState, reducer } from "@/context/propertiesFilterReduce";
import Pagination from "@/components/common/Pagination";
import type { City, Property } from "@/payload-types";
import DropdownSelect2 from "../common/DropdownSelect2";
import SidebarFilter3 from "../common/SidebarFilter3";
import Link from "next/link";
import MapComponent from "../common/Map";
import { useRouter, useSearchParams } from "next/navigation";
import {
  propertyToAnalyticsItem,
  pushAnalyticsEvent,
  readAttribution,
} from "@/lib/analytics/events";
import { getMediaUrl } from "@/lib/media/getMediaUrl";

function parseSizeValue(val: string) {
  if (val === "Min (Mts/2)" || val === "Max (Mts/2)") return val;
  return val.replace(/[^0-9]/g, "");
}

function normalizeBusinessType(value: string) {
  const normalized = value.trim().toLowerCase();

  if (normalized === "arriendo" || normalized === "alquiler") {
    return "arriendo";
  }

  if (normalized === "venta") {
    return "venta";
  }

  return "";
}

function isAllCitiesValue(value: string) {
  return value === "Todas" || value === "Todas las Ciudades";
}

export default function Properties5({
  cities,
  properties,
  initialCity = "Todas las Ciudades",
  initialBusinessType = "Ambos",
  basePath = "/propiedades",
}: {
  cities: City[];
  properties: Property[];
  initialCity?: string;
  initialBusinessType?: string;
  basePath?: string;
}) {
  const router = useRouter();
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

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    city: initialCity,
    businessType: initialBusinessType,
  });

  const searchParams = useSearchParams();
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false);

  useEffect(() => {
    if (hydratedFromUrl) return;

    const q = searchParams.get("q") || "";
    const cityParam = searchParams.get("city") || "";
    const bedroomsParam = searchParams.get("bedrooms") || "";
    const businessTypeParam = searchParams.get("businessType") || "";
    const priceParam = searchParams.get("price") || "";

    setSearchKeyword(q);

    if (cityParam) dispatch({ type: "SET_CITY", payload: cityParam });
    if (bedroomsParam)
      dispatch({ type: "SET_BEDROOMS", payload: bedroomsParam });
    if (businessTypeParam) {
      dispatch({ type: "SET_BUSINESS_TYPE", payload: businessTypeParam });
    }
    if (priceParam) dispatch({ type: "SET_PRICE", payload: priceParam });

    setHydratedFromUrl(true);
  }, [searchParams, hydratedFromUrl]);

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
    businessType,
    sorted,
    currentPage,
    itemPerPage,
  } = state;

  // Additional state for form elements
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Filtering logic
  useEffect(() => {
    let filteredList: Property[] = properties;

    // City filter
    if (city && !isAllCitiesValue(city)) {
      filteredList = filteredList.filter((p) => {
        const cityName =
          typeof p.city === "object"
            ? String(p.city?.name ?? "")
            : String(p.city ?? "");

        return cityName.toLowerCase() === city.toLowerCase();
      });
    }

    // Type filter
    if (businessType && businessType !== "Ambos") {
      const normalizedBusinessType = normalizeBusinessType(businessType);

      filteredList = filteredList.filter(
        (p) =>
          p.businessType &&
          normalizeBusinessType(p.businessType) === normalizedBusinessType,
      );
    }

    // Habitaciones filter
    if (bedrooms && bedrooms !== "Todas las Habitaciones") {
      if (bedrooms === "4+") {
        filteredList = filteredList.filter((p) => Number(p.bedrooms) >= 4);
      } else {
        const bedroomNum = parseInt(bedrooms, 10);
        filteredList = filteredList.filter((p) => p.bedrooms === bedroomNum);
      }
    }

    // Bathrooms filter
    if (bathrooms && bathrooms !== "Todos los Baños") {
      if (bathrooms === "4+") {
        filteredList = filteredList.filter((p) => Number(p.bathrooms) >= 4);
      } else {
        const bathroomNum = parseInt(bathrooms, 10);
        filteredList = filteredList.filter((p) => p.bathrooms === bathroomNum);
      }
    }

    // Garages filter
    if (garages && garages !== "Todos los Garajes") {
      if (garages === "3+") {
        filteredList = filteredList.filter((p) => Number(p.garages) >= 3);
      } else {
        const garageNum = parseInt(garages, 10);
        filteredList = filteredList.filter((p) => p.garages === garageNum);
      }
    }

    // Price filter
    if (price && price !== "Precio Max.") {
      let maxPrice = 0;
      if (price.startsWith("Menos de $")) {
        maxPrice = parseInt(
          price.replace("Menos de $", "").replace(/,/g, ""),
          10,
        );
        filteredList = filteredList.filter((p) => Number(p.price) <= maxPrice);
      } else if (price.startsWith("$")) {
        maxPrice = parseInt(price.replace("$", "").replace(/,/g, ""), 10);
        filteredList = filteredList.filter((p) => Number(p.price) <= maxPrice);
      } else if (price.startsWith("Más de $")) {
        maxPrice = parseInt(
          price.replace("Más de $", "").replace(/,/g, ""),
          10,
        );
        filteredList = filteredList.filter((p) => Number(p.price) > maxPrice);
      }
    }

    // Min size filter
    if (minSize && minSize !== "Min (Mts/2)") {
      const min = parseInt(parseSizeValue(minSize), 10);
      if (!isNaN(min)) {
        filteredList = filteredList.filter(
          (p) => p.area !== undefined && Number(p.area) >= min,
        );
      }
    }

    // Max size filter
    if (maxSize && maxSize !== "Max (Mts/2)") {
      const max = parseInt(parseSizeValue(maxSize), 10);
      if (!isNaN(max)) {
        filteredList = filteredList.filter(
          (p) => p.area !== undefined && Number(p.area) <= max,
        );
      }
    }

    // Features filter
    if (features && features.length > 0) {
      filteredList = filteredList.filter(
        (p) =>
          Array.isArray(p.features) &&
          features.every((f) => p.features!.some((item) => item?.value === f)),
      );
    }

    // Buscar por nombre filter
    if (searchKeyword && searchKeyword.trim() !== "") {
      const kw = searchKeyword.trim().toLowerCase();

      filteredList = filteredList.filter((p) => {
        const cityName =
          typeof p.city === "object" ? p.city.name : String(p.city);
        return (
          (p.title && p.title.toLowerCase().includes(kw)) ||
          (p.address && p.address.toLowerCase().includes(kw)) ||
          (cityName && cityName.toLowerCase().includes(kw))
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
    businessType,
    price,
    minSize,
    maxSize,
    features,
    searchKeyword,
  ]);

  // Sorting logic
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

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchKeyword.trim()) {
      params.set("q", searchKeyword.trim());
    }

    if (
      city &&
      !isAllCitiesValue(city) &&
      city.toLowerCase() !== initialCity.toLowerCase()
    ) {
      params.set("city", city);
    }

    if (
      businessType &&
      businessType !== "Ambos" &&
      normalizeBusinessType(businessType) !==
        normalizeBusinessType(initialBusinessType)
    ) {
      params.set("businessType", normalizeBusinessType(businessType));
    }

    if (bedrooms && bedrooms !== "Todas las Habitaciones") {
      params.set("bedrooms", bedrooms);
    }

    if (bathrooms && bathrooms !== "Todos los Baños") {
      params.set("bathrooms", bathrooms);
    }

    if (garages && garages !== "Todos los Garajes") {
      params.set("garages", garages);
    }

    if (price && price !== "Precio Max.") {
      params.set("price", price);
    }

    if (minSize && minSize !== "Min (Mts/2)") {
      params.set("minSize", minSize);
    }

    if (maxSize && maxSize !== "Max (Mts/2)") {
      params.set("maxSize", maxSize);
    }

    if (features.length > 0) {
      params.set("features", features.join(","));
    }

    if (sortingOption && sortingOption !== "Ordenar por (Predeterminado)") {
      params.set("sort", sortingOption);
    }

    const queryString = params.toString();

    router.replace(queryString ? `${basePath}?${queryString}` : basePath, {
      scroll: false,
    });
  }, [
    router,
    searchKeyword,
    city,
    businessType,
    bedrooms,
    bathrooms,
    garages,
    price,
    minSize,
    maxSize,
    features,
    sortingOption,
    basePath,
    initialCity,
    initialBusinessType,
  ]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();

    pushAnalyticsEvent("search", {
      search_term: searchKeyword.trim(),
      filters: {
        city,
        business_type: businessType,
        bedrooms,
        bathrooms,
        garages,
        price,
        min_size: minSize,
        max_size: maxSize,
      },
      results_count: sorted.length,
      attribution: readAttribution(),
    });
  };

  const toggleAdvancedFilter = () => {
    if (ddContainer.current) {
      ddContainer.current.classList.toggle("show");
    }
  };

  // Props for DropdownSelect
  const allProps = {
    city,
    setCity: (newCity: string) =>
      dispatch({ type: "SET_CITY", payload: newCity }),
    businessType,
    setBusinessType: (newBusinessType: string) =>
      dispatch({ type: "SET_BUSINESS_TYPE", payload: newBusinessType }),
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

  useEffect(() => {
    if (!hydratedFromUrl) return;

    const timeout = window.setTimeout(() => {
      pushAnalyticsEvent("view_item_list", {
        item_list_id: basePath,
        item_list_name: "Propiedades",
        results_count: sorted.length,
        filters: {
          city,
          business_type: businessType,
          bedrooms,
          bathrooms,
          garages,
          price,
          min_size: minSize,
          max_size: maxSize,
          features: features.join(","),
          sort: sortingOption,
          search_term: searchKeyword.trim(),
        },
        items: sorted.slice(0, 12).map((property, index) =>
          propertyToAnalyticsItem(property, index + 1),
        ),
        attribution: readAttribution(),
      });
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [
    hydratedFromUrl,
    sorted,
    basePath,
    city,
    businessType,
    bedrooms,
    bathrooms,
    garages,
    price,
    minSize,
    maxSize,
    features,
    sortingOption,
    searchKeyword,
  ]);

  const handlePropertySelect = (property: Property, index: number) => {
    pushAnalyticsEvent("select_item", {
      item_list_id: basePath,
      item_list_name: "Propiedades",
      items: [propertyToAnalyticsItem(property, index + 1)],
      attribution: readAttribution(),
    });
  };

  return (
    <>
      <div className="main-content">
        <SidebarFilter3
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

        <div className="wrapper-layout">
          <div className="wrap-left">
            <div className="box-title mb_30">
              <div>
                <ul className="breadcrumb style-1 text-button fw-4 mb_4">
                  <li>
                    <Link className="" href={"/"}>
                      Inicio
                    </Link>
                  </li>
                  <li>With Half Map</li>
                </ul>
                {/* <h4>With Half Map</h4> */}
              </div>
              <div className="right d-flex gap_12">
                <ul
                  className="nav-tab-filter align-items-center group-layout  d-flex gap_12"
                  role="tablist"
                >
                  <li className="nav-tab-item" role="presentation">
                    <Link
                      href="#gridLayout"
                      className=" btn-layout grid nav-link-item active"
                      data-bs-toggle="tab"
                    >
                      <i className="icon-SquaresFour"></i>
                    </Link>
                  </li>
                  <li className="nav-tab-item" role="presentation">
                    <Link
                      href="#listLayout"
                      className="nav-link-item btn-layout list "
                      data-bs-toggle="tab"
                    >
                      <i className="icon-Rows"></i>
                    </Link>
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
                  <div className="tf-grid-layout md-col-2">
                    {sorted
                      .slice((currentPage - 1) * 8, currentPage * 8)
                      .map((property, index) => {
                        const firstImage = property.images?.[0];

                        const imageUrl = getMediaUrl(firstImage, "card");

                        return (
                          <div
                            key={property.id}
                            className="card-house style-default hover-image"
                            data-id={property.id}
                          >
                            <div className="img-style mb_20">
                              <Image
                                src={imageUrl}
                                height={258}
                                width={410}
                                alt={
                                  typeof property.images?.[0] === "object"
                                    ? property.images[0].alt ||
                                      property.title ||
                                      "home"
                                    : property.title || "home"
                                }
                                style={{ height: "258px" }}
                              />

                              <div className="wrap-tag d-flex gap_8 mb_12">
                                <div
                                  className={`tag ${
                                    property.businessType === "venta"
                                      ? "sale"
                                      : property.businessType === "arriendo"
                                        ? "rent"
                                        : property.businessType
                                  } text-button-small fw-6 text_primary-color`}
                                >
                                  {property.businessType === "venta"
                                    ? "Venta"
                                    : "Alquiler"}
                                </div>
                                <div className="tag categories text-button-small fw-6 text_primary-color">
                                  {property.propertyType}
                                </div>
                              </div>

                              <Link
                                href={`/detalle-propiedad/${property.id}`}
                                className="overlay-link"
                                onClick={() => handlePropertySelect(property, index)}
                              ></Link>
                              <div className="wishlist">
                                <div className="hover-tooltip tooltip-left box-icon">
                                  <span className="icon icon-Heart"></span>
                                  <span className="tooltip">
                                    Add to Wishlist
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="content">
                              <h4
                                className="price mb_12"
                                suppressHydrationWarning
                              >
                                ${property.price.toLocaleString()}
                                <span className="text_secondary-color text-body-default">
                                  {property.businessType === "venta"
                                    ? "/Mts/2"
                                    : "/mes"}
                                </span>
                              </h4>
                              <Link
                                href={`/detalle-propiedad/${property.id}`}
                                className="title mb_8 h5 link text_primary-color"
                                onClick={() => handlePropertySelect(property, index)}
                              >
                                {property.title}
                              </Link>
                              <p>{property.address}</p>
                              <ul className="info d-flex">
                                <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                  <i className="icon-Bed"></i>
                                  {property.bedrooms} Habitaciones
                                </li>
                                <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                  <i className="icon-Bathtub"></i>
                                  {property.bathrooms} Baños
                                </li>
                                <li
                                  className="d-flex align-items-center gap_8 text-title text_primary-color fw-6 "
                                  suppressHydrationWarning
                                >
                                  <i className="icon-Ruler"></i>
                                  {property.area
                                    ? property.area.toLocaleString()
                                    : "0"}{" "}
                                  Mts/2
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="tab-pane " id="listLayout" role="tabpanel">
                  <div className="wrap-list d-grid gap_30">
                    {sorted
                      .slice(
                        (currentPage - 1) * itemPerPage,
                        currentPage * itemPerPage,
                      )
                      .map((property, index) => (
                        <div
                          className="card-house style-list v3"
                          data-id={property.id}
                          key={property.id}
                        >
                          <div className="wrap-img">
                            <Link
                              key={property.id}
                              href={`/detalle-propiedad/${property.id}`}
                              className="img-style"
                              onClick={() => handlePropertySelect(property, index)}
                            >
                              <Image
                                src={getMediaUrl(property.images?.[0], "card")}
                                height={258}
                                width={410}
                                alt={
                                  typeof property.images?.[0] === "object"
                                    ? property.images[0].alt ||
                                      property.title ||
                                      "home"
                                    : property.title || "home"
                                }
                                style={{ height: "258px" }}
                              />
                            </Link>

                            <Link
                              href={`/detalle-propiedad/${property.id}`}
                              className="img-style"
                              onClick={() => handlePropertySelect(property, index)}
                            >
                              <Image
                                src={getMediaUrl(property.images?.[0], "card")}
                                layout="responsive"
                                width={392}
                                height={260}
                                alt={
                                  typeof property.images?.[0] === "object"
                                    ? property.images[0].alt ||
                                      property.title ||
                                      "home"
                                    : property.title || "home"
                                }
                              />
                            </Link>
                          </div>
                          <div className="content">
                            <div className="d-flex align-items-center gap_6 top mb_16 flex-wrap justify-content-between">
                              <h4 className="price " suppressHydrationWarning>
                                ${property.price.toLocaleString()}
                                <span className="text_secondary-color text-body-default">
                                  {property.businessType === "venta"
                                    ? "/Mts/2"
                                    : "/mes"}
                                </span>
                              </h4>
                              <div className="wrap-tag d-flex gap_8">
                                <div
                                  className={`tag ${
                                    property.businessType === "venta"
                                      ? "sale"
                                      : "rent"
                                  } text-button-small fw-6 text_primary-color`}
                                >
                                  {property.businessType === "venta"
                                    ? "A la venta"
                                    : "Alquiler"}
                                </div>
                                <div className="tag categories text-button-small fw-6 text_primary-color">
                                  {property.propertyType}
                                </div>
                              </div>
                            </div>
                            <Link
                              href={`/detalle-propiedad/${property.id}`}
                              className="title mb_8 h5 link text_primary-color"
                              onClick={() => handlePropertySelect(property, index)}
                            >
                              {property.title}
                            </Link>
                            <p>{property.address}</p>
                            <ul className="info d-flex">
                              <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                <i className="icon-Bed"></i>
                                {property.bedrooms} Habitaciones
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
                                {property.area
                                  ? property.area.toLocaleString()
                                  : "0"}
                                Mts/2
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <Pagination
                  currentPage={currentPage}
                  setPage={(value) =>
                    dispatch({
                      type: "SET_CURRENT_PAGE",
                      payload: value,
                    })
                  }
                  itemLength={sorted.length}
                  itemPerPage={itemPerPage}
                />
              </div>
            </div>
          </div>
          <div className="wrap-right overflow-hidden">
            <MapComponent sorted={sorted} />
          </div>
        </div>
      </div>
    </>
  );
}
