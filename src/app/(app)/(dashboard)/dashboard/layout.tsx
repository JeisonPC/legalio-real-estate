import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
// import Layout from "@/components/layouts/Layout-defaul";
import styles from "./dashboard.module.css";
// import CardDocuments from "@/components/cards/cards-documents";
import Aside from "@/components/aside/Aside";
// import { DocumentListPanel } from "@/components/documentListPanel/documentListPanel";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const roleLabels = {
    admin: "Administrador",
    tenant: "Arrendatario",
    owner: "Propietario",
  };

  const roleLabel = roleLabels[user.role] || user.role;

  const asideItems = [
    { label: "Todos los documentos", href: "/dashboard" },
    { label: "Contrato", href: "/dashboard/contract" },
    { label: "Recibos", href: "/dashboard/receipts" },
    {
      label: "Inventario y Acta de Entrega",
      href: "/dashboard/inventory",
    },
    {
      label: "Otros documentos",
      href: "/dashboard/other-documents",
    }
  ];

  if (user.role === "admin") {
    asideItems.push({
      label: "Enviar invitaciones",
      href: "/dashboard/admin/invitaciones",
    });
  }

  return (
    <div className={styles.container}>
      <section className={styles.heading}>
        <div className={styles["heading-left"]}>
          <p>ÁREA DE ARRENDATARIOS</p>

          <h1>
            Bienvenido, <strong>{user.fullName || user.email}</strong>
          </h1>
        </div>
        <div className={styles["heading-right"]}>
          <p>
            Acceda a su documentación legal con la seguridad de nuestra firma.
            Todos sus contratos y recibos validados en un solo entorno soberano.
          </p>
        </div>
      </section>

      <p>Rol: {roleLabel}</p>

      <hr style={{ margin: "20px 0" }} />

      <section className={styles["aside-section"]}>
        <div className={styles["aside-container"]}>
          <Aside items={asideItems} />
          <div className={styles["card-security"]}>
            <h3>Seguridad Legalio</h3>
            <p>
              Encriptación de grado militar y firma digital certificada en cada
              documento.
            </p>
          </div>
        </div>
        <div className={styles["document-list-container"]}>{children}</div>
        <div className={styles["card-security-mobile"]}>
          <h3>Seguridad Legalio</h3>
          <p>
            Encriptación de grado militar y firma digital certificada en cada
            documento.
          </p>
        </div>
      </section>
    </div>
  );
}
