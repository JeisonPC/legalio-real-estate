import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_indentification_type" AS ENUM('CC', 'CE', 'P');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "name" varchar;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "lastname" varchar;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "indentification_type" "public"."enum_users_indentification_type";
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "identification_number" varchar;

    DO $$ BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'users'
          AND column_name = 'full_name'
      ) THEN
        UPDATE "users"
        SET
          "name" = COALESCE(
            NULLIF("name", ''),
            NULLIF(split_part(COALESCE("full_name", ''), ' ', 1), '')
          ),
          "lastname" = COALESCE(
            NULLIF("lastname", ''),
            NULLIF(
              trim(
                regexp_replace(COALESCE("full_name", ''), '^\\S+\\s*', '')
              ),
              ''
            )
          )
        WHERE "full_name" IS NOT NULL;
      END IF;
    END $$;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" DROP COLUMN IF EXISTS "identification_number";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "indentification_type";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "lastname";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "name";
    DROP TYPE IF EXISTS "public"."enum_users_indentification_type";
  `);
}
