import type { Media } from "@/payload-types";

type MediaSize = "thumbnail" | "card" | "detail";

export function getMediaUrl(
  media: Media | number | null | undefined,
  size: MediaSize = "card",
  fallback = "/images/placeholder.jpg",
) {
  if (!media || typeof media !== "object") return fallback;

  return media.sizes?.[size]?.url || media.url || fallback;
}
