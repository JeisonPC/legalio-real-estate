import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "contracts_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "users_id" integer
    );

    CREATE TABLE IF NOT EXISTS "monthly_receipts_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "users_id" integer
    );

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'contracts_rels_parent_fk'
      ) THEN
        ALTER TABLE "contracts_rels" ADD CONSTRAINT "contracts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contracts"("id") ON DELETE cascade ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'contracts_rels_users_fk'
      ) THEN
        ALTER TABLE "contracts_rels" ADD CONSTRAINT "contracts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'monthly_receipts_rels_parent_fk'
      ) THEN
        ALTER TABLE "monthly_receipts_rels" ADD CONSTRAINT "monthly_receipts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."monthly_receipts"("id") ON DELETE cascade ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'monthly_receipts_rels_users_fk'
      ) THEN
        ALTER TABLE "monthly_receipts_rels" ADD CONSTRAINT "monthly_receipts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "contracts_rels_order_idx" ON "contracts_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "contracts_rels_parent_idx" ON "contracts_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "contracts_rels_path_idx" ON "contracts_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "contracts_rels_users_id_idx" ON "contracts_rels" USING btree ("users_id");

    CREATE INDEX IF NOT EXISTS "monthly_receipts_rels_order_idx" ON "monthly_receipts_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "monthly_receipts_rels_parent_idx" ON "monthly_receipts_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "monthly_receipts_rels_path_idx" ON "monthly_receipts_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "monthly_receipts_rels_users_id_idx" ON "monthly_receipts_rels" USING btree ("users_id");

    INSERT INTO "contracts_rels" ("order", "parent_id", "path", "users_id")
    SELECT 0, "id", 'users', "owner_id"
    FROM "contracts"
    WHERE "owner_id" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1
        FROM "contracts_rels"
        WHERE "contracts_rels"."parent_id" = "contracts"."id"
          AND "contracts_rels"."path" = 'users'
          AND "contracts_rels"."users_id" = "contracts"."owner_id"
      );

    INSERT INTO "contracts_rels" ("order", "parent_id", "path", "users_id")
    SELECT 1, "id", 'users', "tenant_id"
    FROM "contracts"
    WHERE "tenant_id" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1
        FROM "contracts_rels"
        WHERE "contracts_rels"."parent_id" = "contracts"."id"
          AND "contracts_rels"."path" = 'users'
          AND "contracts_rels"."users_id" = "contracts"."tenant_id"
      );

    INSERT INTO "monthly_receipts_rels" ("order", "parent_id", "path", "users_id")
    SELECT 0, "id", 'users', "owner_id"
    FROM "monthly_receipts"
    WHERE "owner_id" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1
        FROM "monthly_receipts_rels"
        WHERE "monthly_receipts_rels"."parent_id" = "monthly_receipts"."id"
          AND "monthly_receipts_rels"."path" = 'users'
          AND "monthly_receipts_rels"."users_id" = "monthly_receipts"."owner_id"
      );

    INSERT INTO "monthly_receipts_rels" ("order", "parent_id", "path", "users_id")
    SELECT 1, "id", 'users', "tenant_id"
    FROM "monthly_receipts"
    WHERE "tenant_id" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1
        FROM "monthly_receipts_rels"
        WHERE "monthly_receipts_rels"."parent_id" = "monthly_receipts"."id"
          AND "monthly_receipts_rels"."path" = 'users'
          AND "monthly_receipts_rels"."users_id" = "monthly_receipts"."tenant_id"
      );

    ALTER TABLE "contracts" ALTER COLUMN "owner_id" DROP NOT NULL;
    ALTER TABLE "contracts" ALTER COLUMN "tenant_id" DROP NOT NULL;
    ALTER TABLE "monthly_receipts" ALTER COLUMN "owner_id" DROP NOT NULL;
    ALTER TABLE "monthly_receipts" ALTER COLUMN "tenant_id" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "contracts"
    SET
      "owner_id" = COALESCE(
        "owner_id",
        (
          SELECT "users_id"
          FROM "contracts_rels"
          WHERE "contracts_rels"."parent_id" = "contracts"."id"
            AND "contracts_rels"."path" = 'users'
          ORDER BY "order" ASC NULLS LAST, "id" ASC
          LIMIT 1
        )
      ),
      "tenant_id" = COALESCE(
        "tenant_id",
        (
          SELECT "users_id"
          FROM "contracts_rels"
          WHERE "contracts_rels"."parent_id" = "contracts"."id"
            AND "contracts_rels"."path" = 'users'
          ORDER BY "order" ASC NULLS LAST, "id" ASC
          OFFSET 1
          LIMIT 1
        ),
        (
          SELECT "users_id"
          FROM "contracts_rels"
          WHERE "contracts_rels"."parent_id" = "contracts"."id"
            AND "contracts_rels"."path" = 'users'
          ORDER BY "order" ASC NULLS LAST, "id" ASC
          LIMIT 1
        )
      );

    UPDATE "monthly_receipts"
    SET
      "owner_id" = COALESCE(
        "owner_id",
        (
          SELECT "users_id"
          FROM "monthly_receipts_rels"
          WHERE "monthly_receipts_rels"."parent_id" = "monthly_receipts"."id"
            AND "monthly_receipts_rels"."path" = 'users'
          ORDER BY "order" ASC NULLS LAST, "id" ASC
          LIMIT 1
        )
      ),
      "tenant_id" = COALESCE(
        "tenant_id",
        (
          SELECT "users_id"
          FROM "monthly_receipts_rels"
          WHERE "monthly_receipts_rels"."parent_id" = "monthly_receipts"."id"
            AND "monthly_receipts_rels"."path" = 'users'
          ORDER BY "order" ASC NULLS LAST, "id" ASC
          OFFSET 1
          LIMIT 1
        ),
        (
          SELECT "users_id"
          FROM "monthly_receipts_rels"
          WHERE "monthly_receipts_rels"."parent_id" = "monthly_receipts"."id"
            AND "monthly_receipts_rels"."path" = 'users'
          ORDER BY "order" ASC NULLS LAST, "id" ASC
          LIMIT 1
        )
      );

    ALTER TABLE "contracts_rels" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE "monthly_receipts_rels" DISABLE ROW LEVEL SECURITY;
    DROP TABLE IF EXISTS "contracts_rels" CASCADE;
    DROP TABLE IF EXISTS "monthly_receipts_rels" CASCADE;
  `)
}
