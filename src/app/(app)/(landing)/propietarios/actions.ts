"use server";

import { getPayload } from "payload";
import { redirect } from "next/navigation";
import config from "@payload-config";
import { sendMetaLeadEvent } from "@/lib/meta/meta-capi";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getField = (formData: FormData, name: string) =>
  String(formData.get(name) ?? "").trim();

export async function sendOwnerLead(formData: FormData) {
  const nombre = getField(formData, "nombre");
  const whatsapp = getField(formData, "whatsapp");
  const ciudad = getField(formData, "ciudad");
  const barrio = getField(formData, "barrio");
  const tipoPropiedad = getField(formData, "tipoPropiedad");
  const mensaje = getField(formData, "mensaje");

  if (!nombre || !whatsapp || !ciudad || !tipoPropiedad) {
    throw new Error("Faltan campos obligatorios.");
  }

  const payload = await getPayload({ config });

  await payload.sendEmail({
    to: process.env.CONTACT_TO_EMAIL ?? "contacto@legalio.com.co",
    subject: `Nuevo lead de propietarios - ${nombre}`,
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2>Nuevo lead desde la landing de propietarios</h2>

                <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
                <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
                <p><strong>Ciudad:</strong> ${escapeHtml(ciudad)}</p>
                <p><strong>Barrio:</strong> ${escapeHtml(barrio || "No indicado")}</p>
                <p><strong>Tipo de propiedad:</strong> ${escapeHtml(tipoPropiedad)}</p>

                <hr />

                <p><strong>Mensaje:</strong></p>
                <p>${escapeHtml(mensaje || "No indicado").replace(/\n/g, "<br />")}</p>
            </div>
        `,
  });

  try {
    await sendMetaLeadEvent({
      eventSourceUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.legalio.com.co"}/propietarios`,
      firstName: nombre,
      phone: whatsapp,
      city: ciudad,
      contentName: `Lead propietarios - ${tipoPropiedad}`,
      contentCategory: "real_estate_owner_lead",
    });
  } catch (error) {
    console.error("No se pudo enviar el Lead a Meta CAPI:", error);
  }

  redirect("/propietarios?sent=true#contacto");
}
