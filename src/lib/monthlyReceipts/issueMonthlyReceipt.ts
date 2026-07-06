import type { Payload, PayloadRequest } from "payload";
import type {
  Contract,
  Document,
  MonthlyReceipt,
  Property,
  ReceiptSetting,
  User,
} from "@/payload-types";
import { generateMonthlyReceiptPDF } from "./generateMonthlyReceiptPDF";
import {
  formatCOP,
  formatDate,
  formatReceiptPeriod,
} from "./formatters";
import { getUserDisplayName } from "@/helpers/helpers";

type PopulatedMonthlyReceipt = Omit<
  MonthlyReceipt,
  "contract" | "property" | "users" | "pdfDocument"
> & {
  contract: Contract;
  property: Property;
  users: User[];
  pdfDocument?: (number | null) | Document;
};

const isPopulated = <T extends { id: number }>(
  value: number | T | null | undefined,
): value is T => typeof value === "object" && value !== null;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getAppUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  "http://localhost:3000";

const assertPopulatedReceipt = (
  receipt: MonthlyReceipt,
): PopulatedMonthlyReceipt => {
  const populatedUsers = Array.isArray(receipt.users)
    ? receipt.users.filter(isPopulated)
    : [];

  if (
    !isPopulated(receipt.contract) ||
    !isPopulated(receipt.property) ||
    populatedUsers.length === 0
  ) {
    throw new Error(
      "El recibo debe tener contrato, propiedad y al menos un usuario cargado.",
    );
  }

  return {
    ...receipt,
    users: populatedUsers,
  } as PopulatedMonthlyReceipt;
};

const getReceiptSettings = async (payload: Payload) => {
  try {
    return await payload.findGlobal({
      slug: "receipt-settings",
      depth: 0,
    });
  } catch {
    return {} as Partial<ReceiptSetting>;
  }
};

const findExistingReceiptDocument = async ({
  payload,
  receiptNumber,
  req,
}: {
  payload: Payload;
  receiptNumber: string;
  req?: Partial<PayloadRequest>;
}) => {
  const existingDocument = await payload.find({
    collection: "documents",
    depth: 0,
    limit: 1,
    req,
    where: {
      or: [
        {
          filename: {
            equals: `${receiptNumber}.pdf`,
          },
        },
        {
          title: {
            equals: `Recibo ${receiptNumber}`,
          },
        },
      ],
    },
    overrideAccess: true,
  });

  return existingDocument.docs[0] || null;
};

const withSkipMonthlyReceiptAutoEmail = (req?: Partial<PayloadRequest>) => ({
  ...(req?.context || {}),
  skipMonthlyReceiptAutoEmail: true,
});

const buildEmailHTML = ({
  receipt,
  intro,
}: {
  receipt: PopulatedMonthlyReceipt;
  intro?: string | null;
}) => {
  const dashboardUrl = `${getAppUrl()}/dashboard/receipts`;
  const recipientName =
    receipt.users.length === 1 ? getUserDisplayName(receipt.users[0], "") : "";

  return `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.5;">
      <h2>Recibo de arrendamiento disponible</h2>
      <p>Hola${recipientName ? ` ${escapeHtml(recipientName)}` : ""},</p>
      <p>${escapeHtml(
        intro ||
          "Ya está disponible tu recibo mensual de arrendamiento en el dashboard de Legalio.",
      )}</p>
      <p>
        <strong>Periodo:</strong> ${escapeHtml(
          formatReceiptPeriod(receipt.periodMonth, receipt.periodYear),
        )}<br />
        <strong>Valor:</strong> ${escapeHtml(formatCOP(receipt.totalAmount))}<br />
        <strong>Fecha límite:</strong> ${escapeHtml(formatDate(receipt.dueDate))}
      </p>
      <p>
        <a
          href="${dashboardUrl}"
          style="display: inline-block; background: #1f3b57; color: white; padding: 12px 18px; border-radius: 8px; text-decoration: none; font-weight: bold;"
        >
          Ver recibo
        </a>
      </p>
      <p style="font-size: 12px; color: #6b7280;">
        Legalio
      </p>
    </div>
  `;
};

export async function ensureMonthlyReceiptPDF({
  payload,
  receiptId,
  generatedBy,
  req,
}: {
  payload: Payload;
  receiptId: string | number;
  generatedBy?: number;
  req?: Partial<PayloadRequest>;
}) {
  const rawReceipt = await payload.findByID({
    collection: "monthly-receipts",
    id: receiptId,
    depth: 2,
    overrideAccess: true,
    req,
  });

  const receipt = assertPopulatedReceipt(rawReceipt);

  if (receipt.status === "cancelled") {
    throw new Error("No se puede generar PDF para un recibo anulado.");
  }

  const settings = await getReceiptSettings(payload);

  let pdfDocumentId = isPopulated(receipt.pdfDocument)
    ? receipt.pdfDocument.id
    : typeof receipt.pdfDocument === "number"
      ? receipt.pdfDocument
      : null;

  if (!pdfDocumentId) {
    const existingDocument = await findExistingReceiptDocument({
      payload,
      receiptNumber: receipt.receiptNumber,
      req,
    });

    if (existingDocument) {
      pdfDocumentId = existingDocument.id;
    } else {
      const pdfBuffer = await generateMonthlyReceiptPDF({
        receipt,
        settings,
      });

      const createdDocument = await payload.create({
        collection: "documents",
        data: {
          title: `Recibo ${receipt.receiptNumber}`,
          documentType: "payment_receipt",
          users: receipt.users.map((user) => user.id),
          contract: receipt.contract.id,
          month: String(receipt.periodMonth),
          year: Number(receipt.periodYear),
        },
        req,
        file: {
          data: pdfBuffer,
          mimetype: "application/pdf",
          name: `${receipt.receiptNumber}.pdf`,
          size: pdfBuffer.length,
        },
        overrideAccess: true,
      });

      pdfDocumentId = createdDocument.id;
    }

    await payload.update({
      collection: "monthly-receipts",
      id: receipt.id,
      data: {
        pdfDocument: pdfDocumentId,
        ...(generatedBy ? { generatedBy } : {}),
      },
      context: withSkipMonthlyReceiptAutoEmail(req),
      overrideAccess: true,
      req,
    });
  }

  return {
    receipt,
    pdfDocumentId,
  };
}

export async function issueMonthlyReceipt({
  payload,
  receiptId,
  generatedBy,
  req,
}: {
  payload: Payload;
  receiptId: string | number;
  generatedBy: number;
  req?: Partial<PayloadRequest>;
}) {
  const { receipt, pdfDocumentId } = await ensureMonthlyReceiptPDF({
    payload,
    receiptId,
    generatedBy,
    req,
  });

  if (receipt.status === "draft") {
    throw new Error(
      "Solo se puede enviar un recibo que no esté en borrador.",
    );
  }

  const recipientEmails = receipt.users
    .map((user) => user.email)
    .filter((email): email is string => Boolean(email));

  if (recipientEmails.length === 0) {
    throw new Error(
      "Ningún usuario relacionado con el recibo tiene correo electrónico.",
    );
  }

  const settings = await getReceiptSettings(payload);

  let emailResult: unknown;

  try {
    emailResult = await payload.sendEmail({
      to: recipientEmails,
      subject:
        settings.emailSubject ||
        `Recibo de arrendamiento ${formatReceiptPeriod(
          receipt.periodMonth,
          receipt.periodYear,
        )}`,
      html: buildEmailHTML({
        receipt,
        intro: settings.emailIntro,
      }),
    });
  } catch (error) {
    await payload.update({
      collection: "monthly-receipts",
      id: receipt.id,
      data: {
        emailLastError:
          error instanceof Error ? error.message : "Error enviando correo",
      },
      context: withSkipMonthlyReceiptAutoEmail(req),
      overrideAccess: true,
      req,
    });

    throw error;
  }

  const emailMessageId =
    typeof emailResult === "object" && emailResult !== null && "id" in emailResult
      ? String(emailResult.id)
      : undefined;

  return payload.update({
    collection: "monthly-receipts",
    id: receipt.id,
    data: {
      status: "sent",
      sentAt: new Date().toISOString(),
      pdfDocument: pdfDocumentId,
      generatedBy,
      emailLastError: null,
      ...(emailMessageId ? { emailMessageId } : {}),
    },
    context: withSkipMonthlyReceiptAutoEmail(req),
    depth: 2,
    overrideAccess: true,
    req,
  });
}
