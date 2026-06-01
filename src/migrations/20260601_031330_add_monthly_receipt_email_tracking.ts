import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "monthly_receipts" ADD COLUMN IF NOT EXISTS "email_message_id" varchar;
  ALTER TABLE "monthly_receipts" ADD COLUMN IF NOT EXISTS "email_last_error" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "monthly_receipts" DROP COLUMN IF EXISTS "email_message_id";
  ALTER TABLE "monthly_receipts" DROP COLUMN IF EXISTS "email_last_error";`)
}
