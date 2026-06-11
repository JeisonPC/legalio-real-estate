import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";

export default async function DashboardOtherDocumentsPage() {
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

  const { docs: otherDocuments } = await payload.find({
    collection: "documents",
    depth: 0,
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
            equals: "other",
          },
        },
      ],
    },
    sort: "-createdAt",
  });

  const otherDocumentItems = otherDocuments
    .filter((doc) => !!doc.filename || !!doc.url)
    .map((doc) => ({
      id: String(doc.id),
      title: doc.title || "Otro documento",
      size: doc.filesize || null,
      hasFile: Boolean(doc.filename || doc.url),
    }));

  return (
    <div>
      <section className={styles["aside-section"]}>
        <DocumentListPanel
          items={otherDocumentItems}
          title="Otros documentos"
        />
      </section>
    </div>
  );
}
