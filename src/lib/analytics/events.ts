"use client";

import type { Property } from "@/payload-types";

type AnalyticsPrimitive = string | number | boolean | null | undefined;

export type AnalyticsValue =
  | AnalyticsPrimitive
  | AnalyticsValue[]
  | {
      [key: string]: AnalyticsValue;
    };

export type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: AnalyticsPayload[];
  }
}

export const ANALYTICS_STORAGE_KEY = "legalio_marketing_attribution";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export type AttributionData = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

export function isAnalyticsEnabled() {
  return process.env.NODE_ENV === "production";
}

export function pushAnalyticsEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined" || !isAnalyticsEnabled()) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });
}

export function captureAttribution() {
  if (typeof window === "undefined" || !isAnalyticsEnabled()) return null;

  const params = new URLSearchParams(window.location.search);
  const stored = readAttribution();
  const next: AttributionData = { ...stored };
  let hasNewAttribution = false;

  ATTRIBUTION_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      next[key] = value;
      hasNewAttribution = true;
    }
  });

  if (!stored?.landing_page) {
    next.landing_page = window.location.href;
  }

  if (!stored?.referrer && document.referrer) {
    next.referrer = document.referrer;
  }

  if (hasNewAttribution || !stored?.captured_at) {
    next.captured_at = new Date().toISOString();
  }

  if (Object.keys(next).length > 0) {
    window.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(next));
    return next;
  }

  return null;
}

export function readAttribution(): AttributionData | null {
  if (typeof window === "undefined" || !isAnalyticsEnabled()) return null;

  try {
    const raw = window.localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionData) : null;
  } catch {
    return null;
  }
}

export function appendAttributionFields(form: HTMLFormElement) {
  if (!isAnalyticsEnabled()) return;

  const attribution = readAttribution();
  if (!attribution) return;

  Object.entries(attribution).forEach(([name, value]) => {
    if (!value || form.elements.namedItem(name)) return;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = String(value);
    form.appendChild(input);
  });
}

export function getPropertyCity(property: Property) {
  return typeof property.city === "object" ? property.city.name : String(property.city);
}

export function propertyToAnalyticsItem(property: Property, index?: number) {
  return {
    item_id: String(property.id),
    item_name: property.title,
    item_category: property.propertyType,
    item_category2: property.businessType,
    location_id: getPropertyCity(property),
    price: property.price,
    index,
  };
}
