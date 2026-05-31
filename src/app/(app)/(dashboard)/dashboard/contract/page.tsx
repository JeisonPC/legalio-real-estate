import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";

export default async function DashboardPage() {
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

  const { docs: contractDocuments } = await payload.find({
    collection: "documents",
    depth: 0,
    limit: 50,
    where: {
      and: [
        {
          users: {
            equals: user.id,
          },
        },
        {
          documentType: {
            equals: "contract",
          },
        },
      ],
    },
  });

  const contractItems = contractDocuments.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    size: doc.filesize || null,
    hasFile: Boolean(doc.filename || doc.url),
  }));

  return (
    <div>
      <section className={styles["aside-section"]}>
        <DocumentListPanel items={contractItems} title="Contrato" />
      </section>
    </div>
  );
}
