import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_monthly_receipts_period_month" AS ENUM(
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_monthly_receipts_period_year" AS ENUM(
        '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DROP INDEX IF EXISTS "monthly_receipts_contract_period_idx";

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_month" DROP DEFAULT;

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_month"
      SET DATA TYPE "public"."enum_monthly_receipts_period_month"
      USING "period_month"::text::"public"."enum_monthly_receipts_period_month";

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_month"
      SET DEFAULT '5'::"public"."enum_monthly_receipts_period_month";

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_year" DROP DEFAULT;

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_year"
      SET DATA TYPE "public"."enum_monthly_receipts_period_year"
      USING "period_year"::text::"public"."enum_monthly_receipts_period_year";

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_year"
      SET DEFAULT '2026'::"public"."enum_monthly_receipts_period_year";

    CREATE UNIQUE INDEX IF NOT EXISTS "monthly_receipts_contract_period_idx"
      ON "monthly_receipts" USING btree ("contract_id", "period_year", "period_month");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "monthly_receipts_contract_period_idx";

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_month" DROP DEFAULT;

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_month"
      SET DATA TYPE numeric
      USING "period_month"::text::numeric;

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_year" DROP DEFAULT;

    ALTER TABLE "monthly_receipts"
      ALTER COLUMN "period_year"
      SET DATA TYPE numeric
      USING "period_year"::text::numeric;

    CREATE UNIQUE INDEX IF NOT EXISTS "monthly_receipts_contract_period_idx"
      ON "monthly_receipts" USING btree ("contract_id", "period_year", "period_month");

    DROP TYPE IF EXISTS "public"."enum_monthly_receipts_period_month";
    DROP TYPE IF EXISTS "public"."enum_monthly_receipts_period_year";
  `);
}
