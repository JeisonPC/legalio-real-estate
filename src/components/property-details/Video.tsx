"use client";
import Image from "next/image";
import React, { useState, useCallback, useMemo } from "react";
import ModalVideo from "../common/ModalVideo";
import { Property } from "@/payload-types";

function getYouTubeVideoId(url?: string | null): string | undefined {
  if (!url) return undefined;

  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  return match?.[1];
}

function getYouTubeEmbedUrl(url?: string | null): string | undefined {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
}

function getYouTubeThumbnailUrl(url?: string | null): string | undefined {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined;
}

export default function Video({ property }: { property: Property }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleVideoClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const embedUrl = useMemo(() => {
    return getYouTubeEmbedUrl(property.videoUrl);
  }, [property.videoUrl]);

  const thumbnailUrl = useMemo(() => {
    return getYouTubeThumbnailUrl(property.videoUrl);
  }, [property.videoUrl]);

  if (!embedUrl || !thumbnailUrl) return null;

  return (
    <>
      <h5 className="properties-title mb_20">Video</h5>

      <div className="widget-video" style={{ position: "relative" }}>
        <Image
          src={thumbnailUrl}
          alt={property.title || "Video de la propiedad"}
          width={850}
          height={400}
        />

        <div
          onClick={handleVideoClick}
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
        src={embedUrl}
      />
    </>
  );
}