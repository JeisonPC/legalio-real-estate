import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Usuario",
    plural: "Usuarios",
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role"],
  },
  auth: true,
  fields: [
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
      name: "fullName",
      label: "Nombre completo",
      type: "text",
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
  ],
};
