import type { Prisma, Project } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export interface ProjectFilters {
  category?: string | undefined;
  q?: string | undefined;
  featured?: boolean | undefined;
  skip: number;
  take: number;
}

function buildWhere(filters: ProjectFilters): Prisma.ProjectWhereInput {
  const where: Prisma.ProjectWhereInput = {};

  if (filters.category && filters.category !== "semua") {
    where.OR = [
      { categoryKey: filters.category },
      { category: { contains: filters.category, mode: "insensitive" } },
    ];
  }

  if (filters.featured !== undefined) {
    where.featured = filters.featured;
  }

  if (filters.q) {
    const q = filters.q;
    const search: Prisma.ProjectWhereInput[] = [
      { title: { contains: q, mode: "insensitive" } },
      { client: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
      { specs: { contains: q, mode: "insensitive" } },
      { tags: { has: q } },
    ];
    // Gabungkan dengan filter kategori (AND) tanpa saling menimpa.
    where.AND = [{ OR: search }];
  }

  return where;
}

export const projectsRepository = {
  async list(filters: ProjectFilters): Promise<{ items: Project[]; total: number }> {
    const where = buildWhere(filters);

    const [items, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        skip: filters.skip,
        take: filters.take,
      }),
      prisma.project.count({ where }),
    ]);

    return { items, total };
  },

  findBySlug(slug: string): Promise<Project | null> {
    return prisma.project.findUnique({ where: { slug } });
  },

  findById(id: string): Promise<Project | null> {
    return prisma.project.findUnique({ where: { id } });
  },

  create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return prisma.project.create({ data });
  },

  update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return prisma.project.update({ where: { id }, data });
  },

  delete(id: string): Promise<Project> {
    return prisma.project.delete({ where: { id } });
  },

  count(): Promise<number> {
    return prisma.project.count();
  },

  countFeatured(): Promise<number> {
    return prisma.project.count({ where: { featured: true } });
  },
};
