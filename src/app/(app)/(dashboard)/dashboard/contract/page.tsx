import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";
import { isPopulatedDoc } from "@/helpers/helpers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("legalio_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await getPayload({ config });

  const headers = new Headers();
  headers.set("authorization", `JWT ${token}`);

  const { user } = await payload.auth({
    headers,
  });

  if (!user) {
    redirect("/login");
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

  const leasesWithContract = leases.filter(
    (lease) =>
      isPopulatedDoc(lease.contractDocument) && !!lease.contractDocument.url,
  );

  const contractItems = leasesWithContract.map((lease) => ({
    id:
      isPopulatedDoc(lease.contractDocument) && lease.contractDocument.id
        ? lease.contractDocument.id
        : lease.id,
    title: isPopulatedDoc(lease.contractDocument)
      ? lease.contractDocument.title || `Contrato ${lease.leaseCode}`
      : `Contrato ${lease.leaseCode}`,
    size: isPopulatedDoc(lease.contractDocument)
      ? lease.contractDocument.filesize || null
      : null,
    hasFile: !!(
      isPopulatedDoc(lease.contractDocument) && lease.contractDocument.filename
    ),
  }));

  return (
    <div>
      <section className={styles["aside-section"]}>
        <DocumentListPanel items={contractItems} title="Contrato" />
      </section>
    </div>
  );
}
