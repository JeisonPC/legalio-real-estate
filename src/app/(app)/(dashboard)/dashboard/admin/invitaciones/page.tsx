import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import styles from "../../dashboard.module.css";
import UserInvitationsPanel from "./UserInvitationsPanel";

export default async function AdminInvitationsPage() {
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

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  const { docs: users } = await payload.find({
    collection: "users",
    depth: 0,
    limit: 100,
    where: {
      role: {
        not_equals: "admin",
      },
    },
    sort: "-createdAt",
  });

  const items = users.map((item) => ({
    id: String(item.id),
    fullName: item.fullName || "",
    email: item.email,
    role: item.role,
    invitationSent: Boolean(item.invitationSent),
  }));

  return (
    <section className={styles["aside-section"]}>
      <UserInvitationsPanel users={items} />
    </section>
  );
}
