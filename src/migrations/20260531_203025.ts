/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_leases_status" RENAME TO "enum_contracts_status";
  ALTER TABLE "leases" RENAME TO "contracts";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "leases_id" TO "contracts_id";
  ALTER TABLE "contracts" DROP CONSTRAINT "leases_property_id_properties_id_fk";
  
  ALTER TABLE "contracts" DROP CONSTRAINT "leases_owner_id_users_id_fk";
  
  ALTER TABLE "contracts" DROP CONSTRAINT "leases_tenant_id_users_id_fk";
  
  ALTER TABLE "documents" DROP CONSTRAINT "documents_lease_id_leases_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leases_fk";
  
  DROP INDEX "leases_lease_code_idx";
  DROP INDEX "leases_property_idx";
  DROP INDEX "leases_owner_idx";
  DROP INDEX "leases_tenant_idx";
  DROP INDEX "leases_updated_at_idx";
  DROP INDEX "leases_created_at_idx";
  DROP INDEX "documents_lease_idx";
  DROP INDEX "payload_locked_documents_rels_leases_id_idx";
  ALTER TABLE "documents_rels" ADD COLUMN "contracts_id" integer;
  ALTER TABLE "contracts" ADD CONSTRAINT "contracts_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contracts" ADD CONSTRAINT "contracts_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contracts" ADD CONSTRAINT "contracts_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_contracts_fk" FOREIGN KEY ("contracts_id") REFERENCES "public"."contracts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contracts_fk" FOREIGN KEY ("contracts_id") REFERENCES "public"."contracts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "contracts_lease_code_idx" ON "contracts" USING btree ("lease_code");
  CREATE INDEX "contracts_property_idx" ON "contracts" USING btree ("property_id");
  CREATE INDEX "contracts_owner_idx" ON "contracts" USING btree ("owner_id");
  CREATE INDEX "contracts_tenant_idx" ON "contracts" USING btree ("tenant_id");
  CREATE INDEX "contracts_updated_at_idx" ON "contracts" USING btree ("updated_at");
  CREATE INDEX "contracts_created_at_idx" ON "contracts" USING btree ("created_at");
  CREATE INDEX "documents_rels_contracts_id_idx" ON "documents_rels" USING btree ("contracts_id");
  CREATE INDEX "payload_locked_documents_rels_contracts_id_idx" ON "payload_locked_documents_rels" USING btree ("contracts_id");
  ALTER TABLE "documents" DROP COLUMN "lease_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_contracts_status" RENAME TO "enum_leases_status";
  ALTER TABLE "contracts" RENAME TO "leases";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "contracts_id" TO "leases_id";
  ALTER TABLE "leases" DROP CONSTRAINT "contracts_property_id_properties_id_fk";
  
  ALTER TABLE "leases" DROP CONSTRAINT "contracts_owner_id_users_id_fk";
  
  ALTER TABLE "leases" DROP CONSTRAINT "contracts_tenant_id_users_id_fk";
  
  ALTER TABLE "documents_rels" DROP CONSTRAINT "documents_rels_contracts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contracts_fk";
  
  DROP INDEX "contracts_lease_code_idx";
  DROP INDEX "contracts_property_idx";
  DROP INDEX "contracts_owner_idx";
  DROP INDEX "contracts_tenant_idx";
  DROP INDEX "contracts_updated_at_idx";
  DROP INDEX "contracts_created_at_idx";
  DROP INDEX "documents_rels_contracts_id_idx";
  DROP INDEX "payload_locked_documents_rels_contracts_id_idx";
  ALTER TABLE "documents" ADD COLUMN "lease_id" integer;
  ALTER TABLE "leases" ADD CONSTRAINT "leases_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leases" ADD CONSTRAINT "leases_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leases" ADD CONSTRAINT "leases_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_lease_id_leases_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."leases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leases_fk" FOREIGN KEY ("leases_id") REFERENCES "public"."leases"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "leases_lease_code_idx" ON "leases" USING btree ("lease_code");
  CREATE INDEX "leases_property_idx" ON "leases" USING btree ("property_id");
  CREATE INDEX "leases_owner_idx" ON "leases" USING btree ("owner_id");
  CREATE INDEX "leases_tenant_idx" ON "leases" USING btree ("tenant_id");
  CREATE INDEX "leases_updated_at_idx" ON "leases" USING btree ("updated_at");
  CREATE INDEX "leases_created_at_idx" ON "leases" USING btree ("created_at");
  CREATE INDEX "documents_lease_idx" ON "documents" USING btree ("lease_id");
  CREATE INDEX "payload_locked_documents_rels_leases_id_idx" ON "payload_locked_documents_rels" USING btree ("leases_id");
  ALTER TABLE "documents_rels" DROP COLUMN "contracts_id";`)
}
