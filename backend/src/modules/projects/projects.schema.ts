import { z } from "zod";

export const projectCategories = ["fabrikasi", "pipa", "otomasi"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Maksimal ${max} karakter.`)
    .optional()
    .nullable();

export const listProjectsQuerySchema = z.object({
  category: z.string().trim().optional(),
  q: z.string().trim().optional(),
  featured: z.enum(["true", "false"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const projectSlugParamSchema = z.object({
  slug: z.string().trim().min(1, "Slug wajib diisi."),
});

export const projectIdParamSchema = z.object({
  id: z.string().uuid("ID tidak valid."),
});

export const createProjectSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter.").max(220),
  slug: z.string().trim().max(180).optional(),
  category: z.string().trim().min(1, "Kategori wajib diisi.").max(100),
  categoryKey: z.enum(projectCategories, {
    errorMap: () => ({ message: "Kategori harus salah satu dari: fabrikasi, pipa, otomasi." }),
  }),
  imageUrl: optionalText(2000),
  imagePublicId: optionalText(255),
  location: z.string().trim().min(1, "Lokasi wajib diisi.").max(180),
  client: z.string().trim().min(1, "Nama klien wajib diisi.").max(180),
  year: z.string().trim().min(1, "Tahun wajib diisi.").max(40),
  capacity: optionalText(140),
  specs: optionalText(2000),
  scope: optionalText(4000),
  description: optionalText(4000),
  tags: z.array(z.string().trim().min(1).max(60)).max(20).default([]),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).max(9999).default(0),
});

export const updateProjectSchema = createProjectSchema.partial();

export const toggleFeaturedSchema = z.object({
  featured: z.boolean(),
});

export type ListProjectsQuery = z.infer<typeof listProjectsQuerySchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
