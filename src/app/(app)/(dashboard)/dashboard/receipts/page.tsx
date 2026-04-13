import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";
import type { Document } from "@/payload-types";

export default async function DashboardReceiptsPage() {
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

    const { docs: receipts } = await payload.find({
        collection: "documents",
        depth: 1,
        limit: 100,
        where: {
            and: [
                {
                    tenant: {
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

    const receiptsWithUrl = receipts.filter((receipt) => !!receipt.url);

    return (
        <div>
            <section className={styles["aside-section"]}>
                <DocumentListPanel<Document>
                    items={receiptsWithUrl}
                    title="Recibos de pago"
                    getId={(receipt) => receipt.id}
                    getTitle={(receipt) => {
                        const month = receipt.month ? ` - ${receipt.month}` : "";
                        const year = receipt.year ? ` ${receipt.year}` : "";
                        return receipt.title || `Recibo${month}${year}`;
                    }}
                    getSize={(receipt) => receipt.filesize}
                    getUrl={(receipt) => receipt.url}
                />
            </section>
        </div>
    );
}