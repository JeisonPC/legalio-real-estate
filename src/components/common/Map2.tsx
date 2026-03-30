"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Media, Property } from "@/payload-types";

type MapProperty = Property & {
  lat: number;
  long: number;
};

export default function MapComponent({ property }: { property: MapProperty }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = useCallback((p: Property) => {
    const firstImage = (p.images ?? []).find(
      (image): image is Media =>
        typeof image === "object" && image !== null && "url" in image,
    );

    return firstImage?.url ?? "/assets/images/section/popup-property.jpg";
  }, []);

  const createPopupHTML = useCallback(
    (p: MapProperty) => `
      <div class="popup-property">
        <div class="img-style">
          <img
            src="${getImageUrl(p)}"
            width="120"
            height="120"
            alt="popup-property"
          />
        </div>
        <div class="content">
          <p class="text-caption-1 mb_4">${p.address}</p>
          <h6 class="mb_12 line-clamp-1">${p.title}</h6>
          <ul class="info d-flex">
            <li><i class="icon-Bed"></i> ${p.bedrooms ?? 0} Bed</li>
            <li><i class="icon-Bathtub"></i> ${p.bathrooms ?? 0} Bath</li>
            <li><i class="icon-Ruler"></i> ${p.area ?? 0} area</li>
          </ul>
        </div>
      </div>
    `,
    [getImageUrl],
  );

  const showPopup = useCallback(
    (p: MapProperty) => {
      const coords: [number, number] = p.coordinates ?? [p.long, p.lat];

      map.current?.flyTo({
        center: coords,
        zoom: 14,
        speed: 1.2,
        essential: true,
      });

      popupRef.current?.remove();
      popupRef.current = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: "bottom",
        offset: [0, -30],
      })
        .setLngLat(coords)
        .setHTML(createPopupHTML(p))
        .addTo(map.current!);
    },
    [createPopupHTML],
  );

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      setError("Missing Mapbox access token.");
      return;
    }

    if (!mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = accessToken;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [property.long, property.lat],
        zoom: 13,
        cooperativeGestures: true,
      });

      const coords: [number, number] = property.coordinates ?? [
        property.long,
        property.lat,
      ];

      const markerEl = document.createElement("div");
      markerEl.className = "office-marker active";
      markerEl.innerHTML = `<i class="icon-HouseLine"></i>`;

      new mapboxgl.Marker(markerEl).setLngLat(coords).addTo(map.current!);

      markerEl.addEventListener("click", () => {
        document
          .querySelectorAll(".office-marker")
          .forEach((m) => m.classList.remove("active"));
        markerEl.classList.add("active");
        showPopup(property);
      });

      showPopup(property);

      map.current.on("click", (e) => {
        const target = e.originalEvent.target as HTMLElement;
        if (!target.closest(".office-marker")) {
          popupRef.current?.remove();
          popupRef.current = null;
          document
            .querySelectorAll(".office-marker")
            .forEach((m) => m.classList.remove("active"));
        }
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "top-right",
      );

      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        setError("Map load error.");
      });
    } catch (err) {
      console.error("Map init error:", err);
      setError("Map init failed.");
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [property, showPopup]);

  if (error) return <div className="text-red-600">{error}</div>;
  return <div ref={mapContainer} className="map-container" />;
}
