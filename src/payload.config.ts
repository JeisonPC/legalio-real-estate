import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Properties } from "./collections/Properties";
import { es } from "@payloadcms/translations/languages/es";
import { Cities } from "./collections/Cities";
import { Countries } from "./collections/Countries";
import { Departments } from "./collections/Departments";
import { Documents } from "./collections/Documents";
import { Leases } from "./collections/Leases";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  i18n: {
    fallbackLanguage: "es",
    supportedLanguages: { es },
  },

  collections: [
    Users,
    Media,
    Properties,
    Countries,
    Departments,
    Cities,
    Leases,
    Documents,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "media",
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename;
            return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          },
        },
        documents: {
          prefix: "documents",
        },
      },
      bucket: process.env.AWS_BUCKET_NAME!,
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET!,
        },
        region: process.env.AWS_REGION!,
      },
    }),
  ],

  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: "contacto@legalio.com.co",
        defaultFromName: "Legalio",
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      })
    : undefined,
});
