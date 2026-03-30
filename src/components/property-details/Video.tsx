"use client";
import Image from "next/image";
import React, { useState, useCallback, useMemo } from "react";
import ModalVideo from "../common/ModalVideo";
import { Media, Property } from "@/payload-types";

export default function Video({ property }: { property: Property }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleVideoClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const coverImage = useMemo(() => {
    const images = (property?.images ?? []).filter(
      (image): image is Media =>
        typeof image === "object" && image !== null && "url" in image,
    );

    return images[0] ?? null;
  }, [property?.images]);

  if (!coverImage?.url) return null;

  return (
    <>
      <h5 className="properties-title mb_20">Video</h5>

      <div className="widget-video" style={{ position: "relative" }}>
        <Image
          data-src={coverImage.url}
          src={coverImage.url}
          alt={coverImage.alt || property.title || "Video de la propiedad"}
          width={coverImage.width ?? 850}
          height={coverImage.height ?? 400}
        />

        <div
          onClick={handleVideoClick}
          data-fancybox="gallery2"
          className="btn-video popup-youtube"
          aria-label="Play Video"
        >
          <Image
            src="/assets/icons/play.svg"
            alt="play"
            width={50}
            height={50}
          />
        </div>
      </div>

      <ModalVideo
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        videoId={"XHOmBV4js_E"}
      />
    </>
  );
}
