import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";
import { resendAdapter } from "@payloadcms/email-resend";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Properties } from "./collections/Properties";
import { es } from "@payloadcms/translations/languages/es";
import { Cities } from "./collections/Cities";
import { Countries } from "./collections/Countries";
import { Departments } from "./collections/Departments";
import { Documents } from "./collections/Documents";
import { Contracts } from "./collections/Contracts";
import { MonthlyReceipts } from "./collections/MonthlyReceipts";
import { Blogs } from "./collections/Blogs";
import { ReceiptSettings } from "./globals/ReceiptSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const requiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const defaultFromAddress =
  process.env.EMAIL_FROM_ADDRESS || "contacto@legalio.com.co";

const defaultFromName = process.env.EMAIL_FROM_NAME || "Legalio";

const emailAdapter = resendAdapter({
  apiKey: requiredEnv("RESEND_API_KEY"),
  defaultFromAddress,
  defaultFromName,
});

export default buildConfig({
  serverURL:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    "http://localhost:3000",

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
    Contracts,
    MonthlyReceipts,
    Documents,
    Blogs,
  ],

  globals: [ReceiptSettings],

  editor: lexicalEditor(),

  secret: requiredEnv("PAYLOAD_SECRET"),

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: postgresAdapter({
    pool: {
      connectionString: requiredEnv("DATABASE_URL"),
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
      bucket: requiredEnv("AWS_BUCKET_NAME"),
      config: {
        credentials: {
          accessKeyId: requiredEnv("AWS_ACCESS_KEY_ID"),
          secretAccessKey: requiredEnv("AWS_ACCESS_KEY_SECRET"),
        },
        region: requiredEnv("AWS_REGION"),
      },
    }),
  ],

  email: emailAdapter,
});
