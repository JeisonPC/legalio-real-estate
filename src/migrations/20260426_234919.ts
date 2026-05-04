import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_blogs_status') THEN
      CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published');
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_blogs_category') THEN
      CREATE TYPE "public"."enum_blogs_category" AS ENUM('arrendamiento', 'compra-vivienda', 'propiedad-horizontal', 'legal-inmobiliario');
    END IF;
  END $$;

  CREATE TABLE IF NOT EXISTS "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"cover_image_id" integer,
  	"quote" varchar,
  	"quote_author" varchar,
  	"content" jsonb NOT NULL,
  	"status" "enum_blogs_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"author_id" integer,
  	"category" "enum_blogs_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "blogs_id" integer;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'blogs_cover_image_id_media_id_fk') THEN
      ALTER TABLE "blogs" ADD CONSTRAINT "blogs_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'blogs_author_id_users_id_fk') THEN
      ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  CREATE UNIQUE INDEX IF NOT EXISTS "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blogs_cover_image_idx" ON "blogs" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "blogs_author_idx" ON "blogs" USING btree ("author_id");
  CREATE INDEX IF NOT EXISTS "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blogs_created_at_idx" ON "blogs" USING btree ("created_at");

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_blogs_fk') THEN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blogs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blogs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blogs_fk";
  
  DROP INDEX "payload_locked_documents_rels_blogs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blogs_id";
  DROP TYPE "public"."enum_blogs_status";
  DROP TYPE "public"."enum_blogs_category";`)
}
