import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "./dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";
import { isPopulatedDoc } from "@/helpers/helpers";

type DashboardDocumentItem = {
    id: string;
    title: string;
    size: number | null;
    url: string | null;
};

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

    console.log("Leases encontrados:", leases);

    const documents: DashboardDocumentItem[] = leases.flatMap((lease) => {
        const result: DashboardDocumentItem[] = [];

        if (isPopulatedDoc(lease.contractDocument)) {
            result.push({
                id: `contract-${lease.id}-${lease.contractDocument.id}`,
                title: lease.contractDocument.title || `Contrato ${lease.leaseCode}`,
                size: lease.contractDocument.filesize || null,
                url: lease.contractDocument.url || null,
            });
        }

        if (isPopulatedDoc(lease.inventoryDocument)) {
            result.push({
                id: `inventory-${lease.id}-${lease.inventoryDocument.id}`,
                title:
                    lease.inventoryDocument.title ||
                    `Inventario y acta de entrega ${lease.leaseCode}`,
                size: lease.inventoryDocument.filesize || null,
                url: lease.inventoryDocument.url || null,
            });
        }

        const otherDocuments =
            lease.otherDocuments?.filter(isPopulatedDoc) ?? [];

        for (const doc of otherDocuments) {
            result.push({
                id: `other-${lease.id}-${doc.id}`,
                title: doc.title || `Documento ${doc.id}`,
                size: doc.filesize || null,
                url: doc.url || null,
            });
        }

        return result;
    });

    return (
        <div>
            <section className={styles["aside-section"]}>
                <DocumentListPanel<DashboardDocumentItem>
                    items={documents}
                    title="Todos los documentos"
                    getId={(doc) => doc.id}
                    getTitle={(doc) => doc.title}
                    getSize={(doc) => doc.size}
                    getUrl={(doc) => doc.url} />
            </section>
        </div>
    );
}