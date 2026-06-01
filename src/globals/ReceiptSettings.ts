import type { GlobalConfig } from "payload";

export const ReceiptSettings: GlobalConfig = {
  slug: "receipt-settings",
  label: "Configuración de recibos",
  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "companyName",
      label: "Nombre de la empresa",
      type: "text",
      defaultValue: "Legalio",
      required: true,
    },
    {
      name: "companyNit",
      label: "NIT",
      type: "text",
    },
    {
      name: "companyAddress",
      label: "Dirección",
      type: "text",
    },
    {
      name: "companyEmail",
      label: "Correo",
      type: "email",
    },
    {
      name: "companyPhone",
      label: "Teléfono",
      type: "text",
    },
    {
      name: "paymentInstructions",
      label: "Instrucciones de pago",
      type: "textarea",
      defaultValue:
        "Realiza el pago usando la referencia del recibo y conserva el comprobante.",
    },
    {
      name: "bankName",
      label: "Banco",
      type: "text",
    },
    {
      name: "bankAccountType",
      label: "Tipo de cuenta",
      type: "text",
    },
    {
      name: "bankAccountNumber",
      label: "Número de cuenta",
      type: "text",
    },
    {
      name: "bankAccountHolder",
      label: "Titular de la cuenta",
      type: "text",
    },
    {
      name: "footerText",
      label: "Texto de pie de página",
      type: "textarea",
      defaultValue:
        "Este documento fue generado automáticamente por Legalio.",
    },
    {
      name: "emailSubject",
      label: "Asunto del correo",
      type: "text",
      defaultValue: "Tu recibo de arrendamiento está disponible",
      required: true,
    },
    {
      name: "emailIntro",
      label: "Introducción del correo",
      type: "textarea",
      defaultValue:
        "Ya está disponible tu recibo mensual de arrendamiento en el dashboard de Legalio.",
    },
  ],
};
