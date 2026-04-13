/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "leases_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  ALTER TABLE "leases" ADD COLUMN "contract_document_id" integer;
  ALTER TABLE "leases" ADD COLUMN "inventory_document_id" integer;
  ALTER TABLE "leases_rels" ADD CONSTRAINT "leases_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leases_rels" ADD CONSTRAINT "leases_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "leases_rels_order_idx" ON "leases_rels" USING btree ("order");
  CREATE INDEX "leases_rels_parent_idx" ON "leases_rels" USING btree ("parent_id");
  CREATE INDEX "leases_rels_path_idx" ON "leases_rels" USING btree ("path");
  CREATE INDEX "leases_rels_documents_id_idx" ON "leases_rels" USING btree ("documents_id");
  ALTER TABLE "leases" ADD CONSTRAINT "leases_contract_document_id_documents_id_fk" FOREIGN KEY ("contract_document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leases" ADD CONSTRAINT "leases_inventory_document_id_documents_id_fk" FOREIGN KEY ("inventory_document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "leases_contract_document_idx" ON "leases" USING btree ("contract_document_id");
  CREATE INDEX "leases_inventory_document_idx" ON "leases" USING btree ("inventory_document_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leases_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "leases_rels" CASCADE;
  ALTER TABLE "leases" DROP CONSTRAINT "leases_contract_document_id_documents_id_fk";
  
  ALTER TABLE "leases" DROP CONSTRAINT "leases_inventory_document_id_documents_id_fk";
  
  DROP INDEX "leases_contract_document_idx";
  DROP INDEX "leases_inventory_document_idx";
  ALTER TABLE "leases" DROP COLUMN "contract_document_id";
  ALTER TABLE "leases" DROP COLUMN "inventory_document_id";`)
}
