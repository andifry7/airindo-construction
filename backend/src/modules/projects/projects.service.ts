import type { Project } from "@prisma/client";
import { AppError } from "../../shared/errors/AppError";
import { slugify } from "../../shared/utils/slug";
import { projectsRepository } from "./projects.repository";
import type {
  CreateProjectInput,
  ListProjectsQuery,
  UpdateProjectInput,
} from "./projects.schema";

/** Pastikan slug unik; tambahkan sufiks -2, -3, ... bila sudah dipakai. */
async function buildUniqueSlug(source: string, excludeId?: string): Promise<string> {
  const root = slugify(source) || "proyek";
  let candidate = root;
  let counter = 2;

  for (;;) {
    const existing = await projectsRepository.findBySlug(candidate);
    if (!existing || existing.id === excludeId) {
      return candidate;
    }
    candidate = `${root}-${counter}`;
    counter += 1;
  }
}

export interface PaginatedProjects {
  items: Project[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export const projectsService = {
  async list(query: ListProjectsQuery): Promise<PaginatedProjects> {
    const page = query.page;
    const limit = query.limit;

    const { items, total } = await projectsRepository.list({
      category: query.category,
      q: query.q,
      featured: query.featured === undefined ? undefined : query.featured === "true",
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  },

  async listFeatured(limit = 6): Promise<Project[]> {
    const { items } = await projectsRepository.list({
      featured: true,
      skip: 0,
      take: limit,
    });
    return items;
  },

  async getBySlug(slug: string): Promise<Project> {
    const project = await projectsRepository.findBySlug(slug);
    if (!project) {
      throw AppError.notFound("Proyek tidak ditemukan.");
    }
    return project;
  },

  async create(input: CreateProjectInput): Promise<Project> {
    const slug = await buildUniqueSlug(input.slug ?? input.title);

    return projectsRepository.create({
      slug,
      title: input.title,
      category: input.category,
      categoryKey: input.categoryKey,
      imageUrl: input.imageUrl ?? null,
      imagePublicId: input.imagePublicId ?? null,
      location: input.location,
      client: input.client,
      year: input.year,
      capacity: input.capacity ?? null,
      specs: input.specs ?? null,
      scope: input.scope ?? null,
      description: input.description ?? null,
      tags: input.tags,
      featured: input.featured,
      sortOrder: input.sortOrder,
    });
  },

  async update(id: string, input: UpdateProjectInput): Promise<Project> {
    const existing = await projectsRepository.findById(id);
    if (!existing) {
      throw AppError.notFound("Proyek tidak ditemukan.");
    }

    // Slug hanya berubah bila dikirim eksplisit. Mengubah judul tidak boleh
    // mematahkan URL proyek yang sudah beredar/terindeks.
    const slug =
      input.slug !== undefined
        ? await buildUniqueSlug(input.slug, existing.id)
        : existing.slug;

    return projectsRepository.update(id, {
      slug,
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.categoryKey !== undefined ? { categoryKey: input.categoryKey } : {}),
      ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl } : {}),
      ...(input.imagePublicId !== undefined ? { imagePublicId: input.imagePublicId } : {}),
      ...(input.location !== undefined ? { location: input.location } : {}),
      ...(input.client !== undefined ? { client: input.client } : {}),
      ...(input.year !== undefined ? { year: input.year } : {}),
      ...(input.capacity !== undefined ? { capacity: input.capacity } : {}),
      ...(input.specs !== undefined ? { specs: input.specs } : {}),
      ...(input.scope !== undefined ? { scope: input.scope } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.tags !== undefined ? { tags: input.tags } : {}),
      ...(input.featured !== undefined ? { featured: input.featured } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    });
  },

  async setFeatured(id: string, featured: boolean): Promise<Project> {
    const existing = await projectsRepository.findById(id);
    if (!existing) {
      throw AppError.notFound("Proyek tidak ditemukan.");
    }
    return projectsRepository.update(id, { featured });
  },

  async remove(id: string): Promise<void> {
    const existing = await projectsRepository.findById(id);
    if (!existing) {
      throw AppError.notFound("Proyek tidak ditemukan.");
    }
    await projectsRepository.delete(id);
  },
};
