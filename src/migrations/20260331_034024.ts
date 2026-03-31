/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "cloudinary_public_id" varchar;
  ALTER TABLE "media" ADD COLUMN "cloudinary_url" varchar;
  ALTER TABLE "media" ADD COLUMN "cloudinary_secure_url" varchar;
  ALTER TABLE "media" ADD COLUMN "bytes" numeric;
  ALTER TABLE "media" ADD COLUMN "format" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN "cloudinary_public_id";
  ALTER TABLE "media" DROP COLUMN "cloudinary_url";
  ALTER TABLE "media" DROP COLUMN "cloudinary_secure_url";
  ALTER TABLE "media" DROP COLUMN "bytes";
  ALTER TABLE "media" DROP COLUMN "format";`)
}
