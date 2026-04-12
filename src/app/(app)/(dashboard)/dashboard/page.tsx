import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "./dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";

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

    const { docs } = await payload.find({
        collection: "documents",
        depth: 1,
        limit: 50,
        where: {
            tenant: {
                equals: user.id,
            },
        },
    });



    return (
        <div>
            <section className={styles["aside-section"]}>
                <DocumentListPanel documents={docs} title="Contrato de Arrendamiento" />
            </section>
        </div>
    );
}