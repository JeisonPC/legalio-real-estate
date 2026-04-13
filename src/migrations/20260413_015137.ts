import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_documents_document_type";
  CREATE TYPE "public"."enum_documents_document_type" AS ENUM('contract', 'inventory', 'application', 'payment_receipt');
  ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE "public"."enum_documents_document_type" USING "document_type"::"public"."enum_documents_document_type";
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT 'media';
  ALTER TABLE "documents" ADD COLUMN "prefix" varchar DEFAULT 'documents';
  ALTER TABLE "media" DROP COLUMN "cloudinary_public_id";
  ALTER TABLE "media" DROP COLUMN "cloudinary_url";
  ALTER TABLE "media" DROP COLUMN "cloudinary_secure_url";
  ALTER TABLE "media" DROP COLUMN "bytes";
  ALTER TABLE "media" DROP COLUMN "format";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_documents_document_type" ADD VALUE 'charge_receipt' BEFORE 'payment_receipt';
  ALTER TABLE "media" ADD COLUMN "cloudinary_public_id" varchar;
  ALTER TABLE "media" ADD COLUMN "cloudinary_url" varchar;
  ALTER TABLE "media" ADD COLUMN "cloudinary_secure_url" varchar;
  ALTER TABLE "media" ADD COLUMN "bytes" numeric;
  ALTER TABLE "media" ADD COLUMN "format" varchar;
  ALTER TABLE "media" DROP COLUMN "prefix";
  ALTER TABLE "documents" DROP COLUMN "prefix";`)
}
