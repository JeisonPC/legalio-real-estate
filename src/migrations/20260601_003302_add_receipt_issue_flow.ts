import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "receipt_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Legalio' NOT NULL,
  	"company_nit" varchar,
  	"company_address" varchar,
  	"company_email" varchar,
  	"company_phone" varchar,
  	"payment_instructions" varchar DEFAULT 'Realiza el pago usando la referencia del recibo y conserva el comprobante.',
  	"bank_name" varchar,
  	"bank_account_type" varchar,
  	"bank_account_number" varchar,
  	"bank_account_holder" varchar,
  	"footer_text" varchar DEFAULT 'Este documento fue generado automáticamente por Legalio.',
  	"email_subject" varchar DEFAULT 'Tu recibo de arrendamiento está disponible' NOT NULL,
  	"email_intro" varchar DEFAULT 'Ya está disponible tu recibo mensual de arrendamiento en el dashboard de Legalio.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "monthly_receipts" ADD COLUMN IF NOT EXISTS "issue_requested" boolean DEFAULT false;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "receipt_settings" CASCADE;
  ALTER TABLE "monthly_receipts" DROP COLUMN IF EXISTS "issue_requested";`)
}
