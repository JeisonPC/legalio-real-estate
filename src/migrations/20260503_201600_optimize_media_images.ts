/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media"
      ADD COLUMN IF NOT EXISTS "sizes_thumbnail_url" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_thumbnail_width" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_thumbnail_height" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_thumbnail_mime_type" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filesize" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filename" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_card_url" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_card_width" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_card_height" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_card_mime_type" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_card_filesize" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_card_filename" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_detail_url" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_detail_width" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_detail_height" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_detail_mime_type" varchar,
      ADD COLUMN IF NOT EXISTS "sizes_detail_filesize" numeric,
      ADD COLUMN IF NOT EXISTS "sizes_detail_filename" varchar;

    CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx"
      ON "media" USING btree ("sizes_thumbnail_filename");

    CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx"
      ON "media" USING btree ("sizes_card_filename");

    CREATE INDEX IF NOT EXISTS "media_sizes_detail_sizes_detail_filename_idx"
      ON "media" USING btree ("sizes_detail_filename");
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "media_sizes_detail_sizes_detail_filename_idx";
    DROP INDEX IF EXISTS "media_sizes_card_sizes_card_filename_idx";
    DROP INDEX IF EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx";

    ALTER TABLE "media"
      DROP COLUMN IF EXISTS "sizes_detail_filename",
      DROP COLUMN IF EXISTS "sizes_detail_filesize",
      DROP COLUMN IF EXISTS "sizes_detail_mime_type",
      DROP COLUMN IF EXISTS "sizes_detail_height",
      DROP COLUMN IF EXISTS "sizes_detail_width",
      DROP COLUMN IF EXISTS "sizes_detail_url",
      DROP COLUMN IF EXISTS "sizes_card_filename",
      DROP COLUMN IF EXISTS "sizes_card_filesize",
      DROP COLUMN IF EXISTS "sizes_card_mime_type",
      DROP COLUMN IF EXISTS "sizes_card_height",
      DROP COLUMN IF EXISTS "sizes_card_width",
      DROP COLUMN IF EXISTS "sizes_card_url",
      DROP COLUMN IF EXISTS "sizes_thumbnail_filename",
      DROP COLUMN IF EXISTS "sizes_thumbnail_filesize",
      DROP COLUMN IF EXISTS "sizes_thumbnail_mime_type",
      DROP COLUMN IF EXISTS "sizes_thumbnail_height",
      DROP COLUMN IF EXISTS "sizes_thumbnail_width",
      DROP COLUMN IF EXISTS "sizes_thumbnail_url";
  `);
}
