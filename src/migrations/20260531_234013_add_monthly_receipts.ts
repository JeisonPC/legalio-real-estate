import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_monthly_receipts_line_items_type" AS ENUM('rent', 'administration', 'utilities', 'other_charge', 'discount', 'late_fee');
  CREATE TYPE "public"."enum_monthly_receipts_status" AS ENUM('draft', 'issued', 'sent', 'paid', 'overdue', 'cancelled');
  CREATE TABLE "monthly_receipts_line_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_monthly_receipts_line_items_type" NOT NULL,
  	"amount" numeric NOT NULL
  );
  
  CREATE TABLE "monthly_receipts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"receipt_number" varchar NOT NULL,
  	"contract_id" integer NOT NULL,
  	"property_id" integer NOT NULL,
  	"owner_id" integer NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"period_month" numeric NOT NULL,
  	"period_year" numeric NOT NULL,
  	"period_start_date" timestamp(3) with time zone NOT NULL,
  	"period_end_date" timestamp(3) with time zone NOT NULL,
  	"issue_date" timestamp(3) with time zone NOT NULL,
  	"due_date" timestamp(3) with time zone NOT NULL,
  	"base_rent" numeric NOT NULL,
  	"administration_fee" numeric DEFAULT 0,
  	"utilities_amount" numeric DEFAULT 0,
  	"other_charges_amount" numeric DEFAULT 0,
  	"discount_amount" numeric DEFAULT 0,
  	"late_fee_amount" numeric DEFAULT 0,
  	"total_amount" numeric NOT NULL,
  	"currency" varchar DEFAULT 'COP' NOT NULL,
  	"status" "enum_monthly_receipts_status" DEFAULT 'draft' NOT NULL,
  	"payment_date" timestamp(3) with time zone,
  	"payment_method" varchar,
  	"payment_reference" varchar,
  	"pdf_document_id" integer,
  	"sent_at" timestamp(3) with time zone,
  	"generated_by_id" integer,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "monthly_receipts_id" integer;
  ALTER TABLE "monthly_receipts_line_items" ADD CONSTRAINT "monthly_receipts_line_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."monthly_receipts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "monthly_receipts" ADD CONSTRAINT "monthly_receipts_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "monthly_receipts" ADD CONSTRAINT "monthly_receipts_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "monthly_receipts" ADD CONSTRAINT "monthly_receipts_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "monthly_receipts" ADD CONSTRAINT "monthly_receipts_tenant_id_users_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "monthly_receipts" ADD CONSTRAINT "monthly_receipts_pdf_document_id_documents_id_fk" FOREIGN KEY ("pdf_document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "monthly_receipts" ADD CONSTRAINT "monthly_receipts_generated_by_id_users_id_fk" FOREIGN KEY ("generated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "monthly_receipts_line_items_order_idx" ON "monthly_receipts_line_items" USING btree ("_order");
  CREATE INDEX "monthly_receipts_line_items_parent_id_idx" ON "monthly_receipts_line_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "monthly_receipts_receipt_number_idx" ON "monthly_receipts" USING btree ("receipt_number");
  CREATE UNIQUE INDEX "monthly_receipts_contract_period_idx" ON "monthly_receipts" USING btree ("contract_id","period_year","period_month");
  CREATE INDEX "monthly_receipts_contract_idx" ON "monthly_receipts" USING btree ("contract_id");
  CREATE INDEX "monthly_receipts_property_idx" ON "monthly_receipts" USING btree ("property_id");
  CREATE INDEX "monthly_receipts_owner_idx" ON "monthly_receipts" USING btree ("owner_id");
  CREATE INDEX "monthly_receipts_tenant_idx" ON "monthly_receipts" USING btree ("tenant_id");
  CREATE INDEX "monthly_receipts_pdf_document_idx" ON "monthly_receipts" USING btree ("pdf_document_id");
  CREATE INDEX "monthly_receipts_generated_by_idx" ON "monthly_receipts" USING btree ("generated_by_id");
  CREATE INDEX "monthly_receipts_updated_at_idx" ON "monthly_receipts" USING btree ("updated_at");
  CREATE INDEX "monthly_receipts_created_at_idx" ON "monthly_receipts" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_monthly_receipts_fk" FOREIGN KEY ("monthly_receipts_id") REFERENCES "public"."monthly_receipts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_monthly_receipts_id_idx" ON "payload_locked_documents_rels" USING btree ("monthly_receipts_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_monthly_receipts_fk";
  DROP INDEX "payload_locked_documents_rels_monthly_receipts_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "monthly_receipts_id";
  ALTER TABLE "monthly_receipts_line_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "monthly_receipts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "monthly_receipts_line_items" CASCADE;
  DROP TABLE "monthly_receipts" CASCADE;
  DROP TYPE "public"."enum_monthly_receipts_line_items_type";
  DROP TYPE "public"."enum_monthly_receipts_status";`)
}
