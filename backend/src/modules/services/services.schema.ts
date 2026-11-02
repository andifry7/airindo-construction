import { z } from "zod";

const optionalText = (max: number) =>
  z.string().trim().max(max, `Maksimal ${max} karakter.`).optional().nullable();

export const serviceIdParamSchema = z.object({
  id: z.string().uuid("ID tidak valid."),
});

export const serviceSlugParamSchema = z.object({
  slug: z.string().trim().min(1, "Slug wajib diisi."),
});

/**
 * Layanan bersifat edit-only (keputusan client): tidak ada create/delete.
 * Slug, ikon, dan urutan tetap dikelola, tetapi judul tidak boleh diubah
 * menjadi kosong.
 */
export const updateServiceSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter.").max(220).optional(),
  shortTitle: z.string().trim().min(2, "Label minimal 2 karakter.").max(80).optional(),
  icon: z.string().trim().min(1, "Ikon wajib diisi.").max(40).optional(),
  imageUrl: optionalText(2000),
  imagePublicId: optionalText(255),
  badge: optionalText(100),
  lead: z.string().trim().min(10, "Ringkasan minimal 10 karakter.").max(2000).optional(),
  description: z.string().trim().min(10, "Deskripsi minimal 10 karakter.").max(6000).optional(),
  scopePoints: z.array(z.string().trim().min(1).max(300)).max(30).optional(),
  standards: z.array(z.string().trim().min(1).max(120)).max(20).optional(),
  caseHighlight: optionalText(500),
  sortOrder: z.number().int().min(0).max(9999).optional(),
});

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
