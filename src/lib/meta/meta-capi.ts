import crypto from "crypto";
import { cookies, headers } from "next/headers";

const META_PIXEL_ID = process.env.META_PIXEL_ID;
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;
const META_GRAPH_VERSION = process.env.META_GRAPH_VERSION ?? "v25.0";

type SendMetaLeadParams = {
  eventId?: string;
  eventSourceUrl: string;
  firstName?: string;
  phone?: string;
  city?: string;
  contentName?: string;
  contentCategory?: string;
};

function sha256(value?: string | null) {
  if (!value) return undefined;

  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function normalizePhone(value?: string | null) {
  if (!value) return undefined;

  const onlyNumbers = value.replace(/\D/g, "");

  // Para Colombia, si viene tipo 3001234567, lo mandamos como 573001234567
  if (onlyNumbers.length === 10 && onlyNumbers.startsWith("3")) {
    return `57${onlyNumbers}`;
  }

  return onlyNumbers;
}

export async function sendMetaLeadEvent({
  eventId,
  eventSourceUrl,
  firstName,
  phone,
  city,
  contentName = "Formulario propietarios Legalio",
  contentCategory = "owner_lead",
}: SendMetaLeadParams) {
  if (!META_PIXEL_ID || !META_CAPI_TOKEN) {
    console.warn("Meta CAPI no configurado: faltan META_PIXEL_ID o META_CAPI_TOKEN");
    return;
  }

  const headersList = await headers();
  const cookieStore = await cookies();

  const forwardedFor = headersList.get("x-forwarded-for");
  const clientIpAddress =
    forwardedFor?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    undefined;

  const clientUserAgent = headersList.get("user-agent") || undefined;

  const fbp = cookieStore.get("_fbp")?.value;
  const fbc = cookieStore.get("_fbc")?.value;

  const normalizedPhone = normalizePhone(phone);

  const finalEventId =
    eventId ?? `lead_propietarios_${Date.now()}_${crypto.randomUUID()}`;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: finalEventId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: {
          ...(firstName ? { fn: [sha256(firstName)] } : {}),
          ...(normalizedPhone ? { ph: [sha256(normalizedPhone)] } : {}),
          ...(city ? { ct: [sha256(city)] } : {}),
          country: [sha256("co")],
          ...(clientIpAddress ? { client_ip_address: clientIpAddress } : {}),
          ...(clientUserAgent ? { client_user_agent: clientUserAgent } : {}),
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
        },
        custom_data: {
          content_name: contentName,
          content_category: contentCategory,
        },
      },
    ],
    ...(META_TEST_EVENT_CODE
      ? { test_event_code: META_TEST_EVENT_CODE }
      : {}),
  };

  const response = await fetch(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Error enviando evento a Meta CAPI:", result);
    return;
  }

  console.info("Evento Lead enviado a Meta CAPI:", result);
}