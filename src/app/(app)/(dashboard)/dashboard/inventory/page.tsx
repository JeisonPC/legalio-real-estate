import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";
import { isPopulatedDoc } from "@/helpers/helpers";

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

  const { docs: leases } = await payload.find({
    collection: "leases",
    depth: 1,
    limit: 50,
    where: {
      tenant: {
        equals: user.id,
      },
    },
  });

  const leasesWithInventory = leases.filter(
    (lease) =>
      isPopulatedDoc(lease.inventoryDocument) &&
      !!lease.inventoryDocument.filename,
  );

  const inventoryItems = leasesWithInventory.map((lease) => ({
    id:
      isPopulatedDoc(lease.inventoryDocument) && lease.inventoryDocument.id
        ? lease.inventoryDocument.id
        : lease.id,
    title: isPopulatedDoc(lease.inventoryDocument)
      ? lease.inventoryDocument.title ||
        `Inventario y Acta de Entrega ${lease.leaseCode}`
      : `Inventario y Acta de Entrega ${lease.leaseCode}`,
    size: isPopulatedDoc(lease.inventoryDocument)
      ? lease.inventoryDocument.filesize || null
      : null,
    hasFile: !!(
      isPopulatedDoc(lease.inventoryDocument) &&
      lease.inventoryDocument.filename
    ),
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
