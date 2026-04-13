import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../dashboard.module.css";
import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";
import type { Lease } from "@/payload-types";
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
        (lease) => isPopulatedDoc(lease.contractDocument) && !!lease.contractDocument.url
    );

    return (
        <div>
            <section className={styles["aside-section"]}>
                <DocumentListPanel<Lease>
                    items={leasesWithContract}
                    title="Contrato"
                    getId={(lease) => lease.id}
                    getTitle={(lease) =>
                        isPopulatedDoc(lease.contractDocument)
                            ? lease.contractDocument.title || `Contrato ${lease.leaseCode}`
                            : `Contrato ${lease.leaseCode}`
                    }
                    getSize={(lease) =>
                        isPopulatedDoc(lease.contractDocument)
                            ? lease.contractDocument.filesize
                            : null
                    }
                    getUrl={(lease) =>
                        isPopulatedDoc(lease.contractDocument)
                            ? lease.contractDocument.url || null
                            : null
                    }
                />
            </section>
        </div>
    );
}