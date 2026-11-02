-- CreateIndex
CREATE INDEX "projects_tags_idx" ON "projects" USING GIN ("tags");
