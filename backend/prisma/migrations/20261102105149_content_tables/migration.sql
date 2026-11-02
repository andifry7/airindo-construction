-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(180) NOT NULL,
    "title" VARCHAR(220) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "category_key" VARCHAR(40) NOT NULL,
    "image_url" TEXT,
    "image_public_id" VARCHAR(255),
    "location" VARCHAR(180) NOT NULL,
    "client" VARCHAR(180) NOT NULL,
    "year" VARCHAR(40) NOT NULL,
    "capacity" VARCHAR(140),
    "specs" TEXT,
    "scope" TEXT,
    "description" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "title" VARCHAR(220) NOT NULL,
    "short_title" VARCHAR(80) NOT NULL,
    "icon" VARCHAR(40) NOT NULL,
    "image_url" TEXT,
    "image_public_id" VARCHAR(255),
    "badge" VARCHAR(100),
    "lead" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scope_points" TEXT[],
    "standards" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "case_highlight" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "sector" VARCHAR(140) NOT NULL,
    "logo_url" TEXT,
    "logo_public_id" VARCHAR(255),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_profile" (
    "id" VARCHAR(20) NOT NULL DEFAULT 'singleton',
    "name" VARCHAR(140) NOT NULL,
    "full_name" VARCHAR(220) NOT NULL,
    "tagline" TEXT NOT NULL,
    "phone" VARCHAR(40) NOT NULL,
    "phone_raw" VARCHAR(40) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "address" TEXT NOT NULL,
    "map_query" TEXT,
    "maps_url" TEXT,
    "established_year" INTEGER NOT NULL,
    "workshop_address" TEXT,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "company_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_stats" (
    "id" UUID NOT NULL,
    "value" VARCHAR(40) NOT NULL,
    "label" VARCHAR(140) NOT NULL,
    "detail" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "company_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" UUID NOT NULL,
    "provider" VARCHAR(40) NOT NULL DEFAULT 'cloudinary',
    "public_id" VARCHAR(255) NOT NULL,
    "url" TEXT NOT NULL,
    "format" VARCHAR(20),
    "width" INTEGER,
    "height" INTEGER,
    "bytes" INTEGER,
    "folder" VARCHAR(140),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshops" (
    "id" UUID NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "location" TEXT NOT NULL,
    "map_query" TEXT,
    "maps_url" TEXT,
    "features" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "workshops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "highlights" (
    "id" UUID NOT NULL,
    "icon" VARCHAR(40) NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "text" TEXT NOT NULL,
    "badge" VARCHAR(100),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "highlights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_values" (
    "id" UUID NOT NULL,
    "icon" VARCHAR(40) NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "text" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "about_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cta_points" (
    "id" UUID NOT NULL,
    "icon" VARCHAR(40) NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "text" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "cta_points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_category_key_idx" ON "projects"("category_key");

-- CreateIndex
CREATE INDEX "projects_featured_idx" ON "projects"("featured");

-- CreateIndex
CREATE INDEX "projects_sort_order_idx" ON "projects"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_sort_order_idx" ON "services"("sort_order");

-- CreateIndex
CREATE INDEX "clients_sector_idx" ON "clients"("sector");

-- CreateIndex
CREATE INDEX "clients_sort_order_idx" ON "clients"("sort_order");

-- CreateIndex
CREATE INDEX "company_stats_sort_order_idx" ON "company_stats"("sort_order");

-- CreateIndex
CREATE INDEX "media_public_id_idx" ON "media"("public_id");

-- CreateIndex
CREATE INDEX "faqs_sort_order_idx" ON "faqs"("sort_order");

-- CreateIndex
CREATE INDEX "workshops_sort_order_idx" ON "workshops"("sort_order");

-- CreateIndex
CREATE INDEX "highlights_sort_order_idx" ON "highlights"("sort_order");

-- CreateIndex
CREATE INDEX "about_values_sort_order_idx" ON "about_values"("sort_order");

-- CreateIndex
CREATE INDEX "cta_points_sort_order_idx" ON "cta_points"("sort_order");
