import { z } from "zod";

const optionalText = (max: number) =>
  z.string().trim().max(max, `Maksimal ${max} karakter.`).optional().nullable();

export const listClientsQuerySchema = z.object({
  sector: z.string().trim().optional(),
  q: z.string().trim().optional(),
});

export const clientIdParamSchema = z.object({
  id: z.string().uuid("ID tidak valid."),
});

export const createClientSchema = z.object({
  name: z.string().trim().min(2, "Nama klien minimal 2 karakter.").max(180),
  sector: z.string().trim().min(1, "Sektor wajib diisi.").max(140),
  logoUrl: optionalText(2000),
  logoPublicId: optionalText(255),
  sortOrder: z.number().int().min(0).max(9999).default(0),
});

export const updateClientSchema = createClientSchema.partial();

export type ListClientsQuery = z.infer<typeof listClientsQuerySchema>;
export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
