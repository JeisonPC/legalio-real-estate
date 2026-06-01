import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1
        FROM pg_type t
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = 'public'
          AND t.typname = 'enum_documents_document_type'
      ) AND NOT EXISTS (
        SELECT 1
        FROM pg_enum e
        JOIN pg_type t ON t.oid = e.enumtypid
        JOIN pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = 'public'
          AND t.typname = 'enum_documents_document_type'
          AND e.enumlabel = 'handover_record'
      ) THEN
        ALTER TYPE "public"."enum_documents_document_type" ADD VALUE 'handover_record' BEFORE 'application';
      END IF;
    END $$;

    DO $$ BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'contracts'
          AND column_name = 'lease_code'
      ) AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'contracts'
          AND column_name = 'contract_code'
      ) THEN
        ALTER TABLE "contracts" RENAME COLUMN "lease_code" TO "contract_code";
      END IF;
    END $$;

    ALTER TABLE "documents_rels" DROP CONSTRAINT IF EXISTS "documents_rels_contracts_fk";

    DROP INDEX IF EXISTS "contracts_lease_code_idx";
    DROP INDEX IF EXISTS "documents_rels_contracts_id_idx";

    ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "contract_id" integer;

    DO $$ BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'documents_rels'
          AND column_name = 'contracts_id'
      ) THEN
        UPDATE "documents" d
        SET "contract_id" = dr."contracts_id"
        FROM "documents_rels" dr
        WHERE dr."parent_id" = d."id"
          AND dr."contracts_id" IS NOT NULL
          AND d."contract_id" IS NULL;
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'documents_contract_id_contracts_id_fk'
      ) THEN
        ALTER TABLE "documents" ADD CONSTRAINT "documents_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "contracts_contract_code_idx" ON "contracts" USING btree ("contract_code");
    CREATE INDEX IF NOT EXISTS "documents_contract_idx" ON "documents" USING btree ("contract_id");
    ALTER TABLE "documents_rels" DROP COLUMN IF EXISTS "contracts_id";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'contracts'
          AND column_name = 'contract_code'
      ) AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'contracts'
          AND column_name = 'lease_code'
      ) THEN
        ALTER TABLE "contracts" RENAME COLUMN "contract_code" TO "lease_code";
      END IF;
    END $$;

  ALTER TABLE "documents" DROP CONSTRAINT IF EXISTS "documents_contract_id_contracts_id_fk";
  
  ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_documents_document_type";
  CREATE TYPE "public"."enum_documents_document_type" AS ENUM('contract', 'inventory', 'application', 'payment_receipt', 'other');
  ALTER TABLE "documents" ALTER COLUMN "document_type" SET DATA TYPE "public"."enum_documents_document_type" USING "document_type"::"public"."enum_documents_document_type";
  DROP INDEX IF EXISTS "contracts_contract_code_idx";
  DROP INDEX IF EXISTS "documents_contract_idx";
  ALTER TABLE "documents_rels" ADD COLUMN IF NOT EXISTS "contracts_id" integer;
  ALTER TABLE "documents_rels" DROP CONSTRAINT IF EXISTS "documents_rels_contracts_fk";
  ALTER TABLE "documents_rels" ADD CONSTRAINT "documents_rels_contracts_fk" FOREIGN KEY ("contracts_id") REFERENCES "public"."contracts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX IF NOT EXISTS "contracts_lease_code_idx" ON "contracts" USING btree ("lease_code");
  CREATE INDEX IF NOT EXISTS "documents_rels_contracts_id_idx" ON "documents_rels" USING btree ("contracts_id");
  ALTER TABLE "documents" DROP COLUMN IF EXISTS "contract_id";`)
}
