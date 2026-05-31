import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";

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
    collection: "documents",
    depth: 1,
    limit: 100,
    where: {
      and: [
        {
          users: {
            equals: user.id,
          },
        },
        {
          documentType: {
            equals: "payment_receipt",
          },
        },
      ],
    },
    sort: "-year",
  });

  const receiptsWithFile = receipts.filter((receipt) => !!receipt.filename);

  const receiptItems = receiptsWithFile.map((receipt) => {
    const month = receipt.month ? ` - ${receipt.month}` : "";
    const year = receipt.year ? ` ${receipt.year}` : "";

    return {
      id: String(receipt.id),
      title: receipt.title || `Recibo${month}${year}`,
      size: receipt.filesize || null,
      hasFile: Boolean(receipt.filename),
    };
  });

  return (
    <div>
      <section className={styles["aside-section"]}>
        <DocumentListPanel items={receiptItems} title="Recibos de pago" />
      </section>
    </div>
  );
}
