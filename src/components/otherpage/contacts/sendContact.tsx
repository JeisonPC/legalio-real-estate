"use server";
import { getPayload } from "payload";
import config from "@payload-config";
import { redirect } from "next/navigation";

export async function sendContact(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!firstName || !lastName || !email || !message) {
    throw new Error("Faltan campos obligatorios.");
  }

  const payload = await getPayload({ config });

  await payload.sendEmail({
    to: process.env.CONTACT_TO_EMAIL ?? "contacto@legalio.com.co",
    replyTo: email,
    subject: `Nuevo mensaje de contacto - ${firstName} ${lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Nuevo mensaje desde Legalio</h2>

        <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No indicado"}</p>

        <hr />

        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      </div>
    `,
  });

  redirect("/contacto?sent=true");
}
