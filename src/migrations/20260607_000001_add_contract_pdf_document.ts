import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "contracts" ADD COLUMN IF NOT EXISTS "pdf_document_id" integer;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'contracts_pdf_document_id_documents_id_fk'
      ) THEN
        ALTER TABLE "contracts" ADD CONSTRAINT "contracts_pdf_document_id_documents_id_fk" FOREIGN KEY ("pdf_document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "contracts_pdf_document_idx" ON "contracts" USING btree ("pdf_document_id");
    ALTER TABLE "documents" ALTER COLUMN "title" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "documents"
    SET "title" = COALESCE(NULLIF("title", ''), COALESCE("filename", 'Documento'))
    WHERE "title" IS NULL OR "title" = '';

    ALTER TABLE "documents" ALTER COLUMN "title" SET NOT NULL;
    ALTER TABLE "contracts" DROP CONSTRAINT IF EXISTS "contracts_pdf_document_id_documents_id_fk";
    DROP INDEX IF EXISTS "contracts_pdf_document_idx";
    ALTER TABLE "contracts" DROP COLUMN IF EXISTS "pdf_document_id";
  `)
}
