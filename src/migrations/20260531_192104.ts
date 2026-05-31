/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "documents" DROP CONSTRAINT "documents_tenant_id_users_id_fk";
  
  DROP INDEX "documents_tenant_idx";
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "documents_rels_order_idx" ON "documents_rels" USING btree ("order");
  CREATE INDEX "documents_rels_parent_idx" ON "documents_rels" USING btree ("parent_id");
  CREATE INDEX "documents_rels_path_idx" ON "documents_rels" USING btree ("path");
  CREATE INDEX "documents_rels_users_id_idx" ON "documents_rels" USING btree ("users_id");
  ALTER TABLE "documents" DROP COLUMN "tenant_id";
  ALTER TABLE "documents" DROP COLUMN "is_visible_to_tenant";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "documents_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "documents_rels" CASCADE;
  ALTER TABLE "documents" ADD COLUMN "tenant_id" integer NOT NULL;
  ALTER TABLE "documents" ADD COLUMN "is_visible_to_tenant" boolean DEFAULT true;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "documents_tenant_idx" ON "documents" USING btree ("tenant_id");`)
}
