import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { ReceiptListPanel } from "@/components/receiptListPanel/receiptListPanel";
import { formatReceiptPeriod } from "@/lib/monthlyReceipts/formatters";
import { isPopulatedDoc } from "@/helpers/helpers";

export default async function DashboardReceiptsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("legalio_token")?.value;

  if (!token) {
    redirect("/inicio-sesion");
  }

  const payload = await getPayload({ config });

  const headers = new Headers();
  headers.set("authorization", `JWT ${token}`);

  const { user } = await payload.auth({
    headers,
  });

  if (!user) {
    redirect("/inicio-sesion");
  }

  const { docs: receipts } = await payload.find({
    collection: "monthly-receipts",
    depth: 1,
    limit: 100,
    where:
      user.role === "admin"
        ? undefined
        : {
            users: {
              equals: user.id,
            },
          },
    sort: "-createdAt",
  });

  const receiptItems = receipts
    .sort((a, b) => {
      const yearDiff = Number(b.periodYear) - Number(a.periodYear);
      if (yearDiff !== 0) return yearDiff;

      return Number(b.periodMonth) - Number(a.periodMonth);
    })
    .map((receipt) => {
      const pdfDocumentId = isPopulatedDoc(receipt.pdfDocument)
        ? receipt.pdfDocument.id
        : receipt.pdfDocument;

      return {
        id: String(receipt.id),
        title: `Recibo ${formatReceiptPeriod(
          receipt.periodMonth,
          receipt.periodYear,
        )}`,
        propertyTitle: isPopulatedDoc(receipt.property)
          ? receipt.property.title
          : null,
        dueDate: receipt.dueDate,
        totalAmount: receipt.totalAmount,
        status: receipt.status,
        documentId: pdfDocumentId ? String(pdfDocumentId) : null,
      };
    });

  return (
    <div>
      <section className={styles["aside-section"]}>
        <ReceiptListPanel items={receiptItems} title="Recibos de pago" />
      </section>
    </div>
  );
}
