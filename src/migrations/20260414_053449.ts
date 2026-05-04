/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_documents_document_type" ADD VALUE IF NOT EXISTS 'other';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_documents_document_type";
  CREATE TYPE "public"."enum_documents_document_type" AS ENUM('contract', 'inventory', 'application', 'payment_receipt');
  ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE "public"."enum_documents_document_type" USING "document_type"::"public"."enum_documents_document_type";`)
}
