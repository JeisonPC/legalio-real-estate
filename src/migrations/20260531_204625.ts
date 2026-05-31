import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_documents_document_type" ADD VALUE 'handover_record' BEFORE 'application';
  ALTER TABLE "contracts" RENAME COLUMN "lease_code" TO "contract_code";
  ALTER TABLE "documents_rels" DROP CONSTRAINT "documents_rels_contracts_fk";
  
  DROP INDEX "contracts_lease_code_idx";
  DROP INDEX "documents_rels_contracts_id_idx";
  ALTER TABLE "documents" ADD COLUMN "contract_id" integer NOT NULL;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "contracts_contract_code_idx" ON "contracts" USING btree ("contract_code");
  CREATE INDEX "documents_contract_idx" ON "documents" USING btree ("contract_id");
  ALTER TABLE "documents_rels" DROP COLUMN "contracts_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contracts" RENAME COLUMN "contract_code" TO "lease_code";
  ALTER TABLE "documents" DROP CONSTRAINT "documents_contract_id_contracts_id_fk";
  
  ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_documents_document_type";
  CREATE TYPE "public"."enum_documents_document_type" AS ENUM('contract', 'inventory', 'application', 'payment_receipt', 'other');
  ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE "public"."enum_documents_document_type" USING "document_type"::"public"."enum_documents_document_type";
  DROP INDEX "contracts_contract_code_idx";
  DROP INDEX "documents_contract_idx";
  ALTER TABLE "documents_rels" ADD COLUMN "contracts_id" integer;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_contracts_fk" FOREIGN KEY ("contracts_id") REFERENCES "public"."contracts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "contracts_lease_code_idx" ON "contracts" USING btree ("lease_code");
  CREATE INDEX "documents_rels_contracts_id_idx" ON "documents_rels" USING btree ("contracts_id");
  ALTER TABLE "documents" DROP COLUMN "contract_id";`)
}
