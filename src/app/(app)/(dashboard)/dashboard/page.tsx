import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "./dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";

interface DashboardDocumentItem {
  id: string;
  title: string;
  size: number | null;
  url: string | null;
  documentType?: string | null;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("legalio_token")?.value;

  if (!token) {
    redirect("/inicio-sesion");
  }

  const payload = await getPayload({ config });

  const headers = new Headers();
  headers.set("authorization", `JWT ${token}`);

  const { user } = await payload.auth({ headers });

  if (!user) {
    redirect("/inicio-sesion");
  }

  const { docs: relatedDocuments } = await payload.find({
    collection: "documents",
    depth: 0,
    limit: 200,
    where: {
      users: {
        equals: user.id,
      },
    },
  });

  const documents: DashboardDocumentItem[] = relatedDocuments.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    size: doc.filesize || null,
    url: doc.url || null,
    documentType: doc.documentType || null,
  }));

  return (
    <div>
      <section className={styles["aside-section"]}>
        <DocumentListPanel
          items={documents.map((doc) => ({
            id: doc.id,
            title: doc.title,
            size: doc.size,
            hasFile: true,
          }))}
          title="Todos los documentos"
        />
      </section>
    </div>
  );
}
