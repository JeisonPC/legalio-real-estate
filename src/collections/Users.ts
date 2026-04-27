// src/collections/Users.ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",

  auth: {
    forgotPassword: {
      expiration: 1000 * 60 * 60 * 24, // 24 horas

      generateEmailSubject: () => {
        return "Crea tu cuenta en Legalio";
      },

      generateEmailHTML: (args) => {
        const token = args?.token;
        const user = args?.user;

        if (!token) {
          return `
      <p>No se pudo generar el enlace para crear la cuenta.</p>
    `;
        }

        const appUrl =
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        const resetUrl = `${appUrl}/crear-cuenta?token=${token}`;

        return `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.5;">
      <h2>Crea tu cuenta en Legalio</h2>

      <p>Hola${user?.fullName ? ` ${user.fullName}` : ""},</p>

      <p>
        Te hemos creado un acceso a Legalio para que puedas consultar tus documentos,
        contratos y recibos de arrendamiento.
      </p>

      <p>
        Para activar tu cuenta, haz clic en el siguiente botón y crea tu contraseña:
      </p>

      <p>
        <a 
          href="${resetUrl}" 
          style="
            display: inline-block;
            background: #1f3b57;
            color: white;
            padding: 12px 18px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
          "
        >
          Crear mi cuenta
        </a>
      </p>

      <p>Este enlace estará disponible por 24 horas.</p>

      <p>
        Si no esperabas este correo, puedes ignorarlo.
      </p>

      <p style="font-size: 12px; color: #6b7280;">
        Legalio
      </p>
    </div>
  `;
      },
    },
  },

  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "fullName",
      label: "Nombre completo",
      type: "text",
    },
    {
      name: "role",
      label: "Rol",
      type: "select",
      required: true,
      defaultValue: "tenant",
      options: [
        {
          label: "Administrador",
          value: "admin",
        },
        {
          label: "Arrendatario",
          value: "tenant",
        },
        {
          label: "Propietario",
          value: "owner",
        },
      ],
    },
    {
      name: "avatar",
      label: "Foto de perfil",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Imagen del usuario o autor del blog.",
      },
    },
    {
      name: "invitationSent",
      label: "Invitación enviada",
      type: "checkbox",
      defaultValue: false,
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
};
