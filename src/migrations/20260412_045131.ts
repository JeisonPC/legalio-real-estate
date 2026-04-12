/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'tenant', 'owner');
  CREATE TYPE "public"."enum_leases_status" AS ENUM('active', 'ended', 'suspended', 'late');
  CREATE TYPE "public"."enum_documents_document_type" AS ENUM('contract', 'inventory', 'application', 'charge_receipt', 'payment_receipt');
  CREATE TABLE "leases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"lease_code" varchar NOT NULL,
  	"property_id" integer NOT NULL,
  	"owner_id" integer NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"monthly_rent" numeric NOT NULL,
  	"deposit_value" numeric,
  	"status" "enum_leases_status" DEFAULT 'active' NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"document_type" "enum_documents_document_type" NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"lease_id" integer,
  	"month" varchar,
  	"year" numeric,
  	"is_visible_to_tenant" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'tenant' NOT NULL;
  ALTER TABLE "users" ADD COLUMN "full_name" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "leases_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "leases" ADD CONSTRAINT "leases_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leases" ADD CONSTRAINT "leases_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leases" ADD CONSTRAINT "leases_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_lease_id_leases_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."leases"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "leases_lease_code_idx" ON "leases" USING btree ("lease_code");
  CREATE INDEX "leases_property_idx" ON "leases" USING btree ("property_id");
  CREATE INDEX "leases_owner_idx" ON "leases" USING btree ("owner_id");
  CREATE INDEX "leases_tenant_idx" ON "leases" USING btree ("tenant_id");
  CREATE INDEX "leases_updated_at_idx" ON "leases" USING btree ("updated_at");
  CREATE INDEX "leases_created_at_idx" ON "leases" USING btree ("created_at");
  CREATE INDEX "documents_tenant_idx" ON "documents" USING btree ("tenant_id");
  CREATE INDEX "documents_lease_idx" ON "documents" USING btree ("lease_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leases_fk" FOREIGN KEY ("leases_id") REFERENCES "public"."leases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_leases_id_idx" ON "payload_locked_documents_rels" USING btree ("leases_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "documents" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "leases" CASCADE;
  DROP TABLE "documents" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leases_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_documents_fk";
  
  DROP INDEX "payload_locked_documents_rels_leases_id_idx";
  DROP INDEX "payload_locked_documents_rels_documents_id_idx";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "users" DROP COLUMN "full_name";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "leases_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "documents_id";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_leases_status";
  DROP TYPE "public"."enum_documents_document_type";`)
}
