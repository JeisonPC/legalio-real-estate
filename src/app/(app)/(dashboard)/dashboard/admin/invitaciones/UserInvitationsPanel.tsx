"use client";

import { useState } from "react";
import styles from "./userInvitationsPanel.module.css";

type UserInvitationItem = {
  id: string;
  fullName?: string;
  email: string;
  role?: string | null;
  invitationSent: boolean;
};

type Props = {
  users: UserInvitationItem[];
};

const roleLabels: Record<string, string> = {
  tenant: "Arrendatario",
  owner: "Propietario",
  admin: "Administrador",
};

export default function UserInvitationsPanel({ users }: Props) {
  const [items, setItems] = useState(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function handleSendInvitation(userId: string) {
    setLoadingId(userId);
    setMessage("");

    try {
      const res = await fetch("/api/send-user-invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "No se pudo enviar la invitación.");
        setLoadingId(null);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === userId
            ? {
                ...item,
                invitationSent: true,
              }
            : item,
        ),
      );

      setMessage("Invitación enviada correctamente.");
      setLoadingId(null);
    } catch {
      setMessage("Ocurrió un error enviando la invitación.");
      setLoadingId(null);
    }
  }

  return (
    <div className={styles.panel}>
      <section className={styles.heading}>
        <div>
          <p className={styles.kicker}>ADMINISTRACIÓN</p>
          <h2 className={styles.title}>Invitaciones de usuarios</h2>
        </div>

        <p className={styles.description}>
          Envía el acceso cuando el usuario ya tenga sus documentos cargados.
        </p>
      </section>

      {message && <p className={styles.message}>{message}</p>}

      {items.length === 0 ? (
        <p className={styles.empty}>No hay usuarios para invitar.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((user) => {
            const roleLabel = user.role
              ? roleLabels[user.role] || user.role
              : "Usuario";

            return (
              <li key={user.id} className={styles.item}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {(user.fullName || user.email).charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className={styles.name}>
                      {user.fullName || "Sin nombre"}
                    </h3>

                    <p className={styles.email}>{user.email}</p>

                    <div className={styles.metaRow}>
                      <span className={styles.role}>{roleLabel}</span>

                      <span
                        className={
                          user.invitationSent
                            ? styles.statusSent
                            : styles.statusPending
                        }
                      >
                        {user.invitationSent
                          ? "Invitación enviada"
                          : "Pendiente por invitar"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.button}
                  disabled={loadingId === user.id}
                  onClick={() => handleSendInvitation(user.id)}
                >
                  {loadingId === user.id
                    ? "Enviando..."
                    : user.invitationSent
                      ? "Reenviar invitación"
                      : "Enviar invitación"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}