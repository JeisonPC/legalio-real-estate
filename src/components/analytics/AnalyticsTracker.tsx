"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  appendAttributionFields,
  captureAttribution,
  pushAnalyticsEvent,
  readAttribution,
} from "@/lib/analytics/events";

function classifyContactHref(href: string) {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("wa.me") || href.includes("whatsapp.com")) return "whatsapp";
  return null;
}

function getFormName(form: HTMLFormElement) {
  return (
    form.getAttribute("data-analytics-form") ||
    form.getAttribute("id") ||
    form.getAttribute("name") ||
    form.className ||
    "form"
  );
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const attribution = captureAttribution();
    if (attribution) {
      pushAnalyticsEvent("marketing_attribution_captured", {
        attribution,
      });
    }
  }, []);

  useEffect(() => {
    const queryString = searchParams.toString();

    pushAnalyticsEvent("virtual_page_view", {
      page_path: queryString ? `${pathname}?${queryString}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
      attribution: readAttribution(),
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const trackedElement = target?.closest<HTMLElement>("[data-analytics-event]");

      if (trackedElement) {
        pushAnalyticsEvent(trackedElement.dataset.analyticsEvent || "cta_click", {
          cta_name: trackedElement.dataset.analyticsName || trackedElement.textContent?.trim().slice(0, 120),
          cta_location: trackedElement.dataset.analyticsLocation || window.location.pathname,
          page_path: window.location.pathname,
          attribution: readAttribution(),
        });
      }

      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const contactType = classifyContactHref(href);

      if (contactType) {
        pushAnalyticsEvent("contact_click", {
          contact_type: contactType,
          link_url: href,
          link_text: link.textContent?.trim().slice(0, 120) || contactType,
          page_path: window.location.pathname,
          attribution: readAttribution(),
        });
        return;
      }

      if (href.includes("/detalle-propiedad/")) {
        pushAnalyticsEvent("property_link_click", {
          link_url: href,
          link_text: link.textContent?.trim().slice(0, 120) || "detalle propiedad",
          page_path: window.location.pathname,
        });
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;

      appendAttributionFields(form);

      pushAnalyticsEvent("form_submit_intent", {
        form_name: getFormName(form),
        page_path: window.location.pathname,
        attribution: readAttribution(),
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/propietarios" || searchParams.get("sent") !== "true") return;

    const leadPayload = {
      lead_type: "owner_property_management",
      conversion_source: "propietarios_landing",
      value: 1,
      currency: "COP",
      attribution: readAttribution(),
    };

    pushAnalyticsEvent("legalio_lead_submit", leadPayload);
    pushAnalyticsEvent("generate_lead", leadPayload);
  }, [pathname, searchParams]);

  return null;
}
