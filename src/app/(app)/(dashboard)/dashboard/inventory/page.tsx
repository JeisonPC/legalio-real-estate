import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";

export default async function DashboardInventoryPage() {
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

  const { docs: inventoryDocuments } = await payload.find({
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
            equals: "inventory",
          },
        },
      ],
    },
    sort: "-createdAt",
  });

  const inventoryItems = inventoryDocuments
    .filter((doc) => !!doc.filename)
    .map((doc) => ({
      id: String(doc.id),
      title: doc.title || "Inventario y Acta de Entrega",
      size: doc.filesize || null,
      hasFile: Boolean(doc.filename),
    }));

  return (
    <div>
      <section className={styles["aside-section"]}>
        <DocumentListPanel
          items={inventoryItems}
          title="Inventario y Acta de Entrega"
        />
      </section>
    </div>
  );
}
