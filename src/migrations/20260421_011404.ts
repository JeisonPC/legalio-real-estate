/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "properties" DROP COLUMN IF EXISTS "img_width";
  ALTER TABLE "properties" DROP COLUMN IF EXISTS "img_height";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "img_width" numeric;
  ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "img_height" numeric;`)
}
