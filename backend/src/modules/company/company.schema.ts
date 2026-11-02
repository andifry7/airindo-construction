import { z } from "zod";

const optionalText = (max: number) =>
  z.string().trim().max(max, `Maksimal ${max} karakter.`).optional().nullable();

export const companyStatSchema = z.object({
  value: z.string().trim().min(1, "Nilai wajib diisi.").max(40),
  label: z.string().trim().min(1, "Label wajib diisi.").max(140),
  detail: z.string().trim().max(500).optional().nullable(),
});

export const updateCompanySchema = z.object({
  name: z.string().trim().min(2).max(140).optional(),
  fullName: z.string().trim().min(2).max(220).optional(),
  tagline: z.string().trim().min(10, "Tagline minimal 10 karakter.").max(600).optional(),
  phone: z.string().trim().min(5, "Nomor telepon wajib diisi.").max(40).optional(),
  phoneRaw: z
    .string()
    .trim()
    .regex(/^\d{8,20}$/, "Format WA harus angka saja (contoh: 6287872266146).")
    .optional(),
  email: z.string().trim().email("Format email tidak valid.").max(180).optional(),
  address: z.string().trim().min(10, "Alamat minimal 10 karakter.").max(1000).optional(),
  mapQuery: optionalText(500),
  mapsUrl: optionalText(1000),
  establishedYear: z.number().int().min(1900).max(2100).optional(),
  workshopAddress: optionalText(500),
  /** Bila dikirim, seluruh statistik diganti dengan daftar ini (urutan sesuai array). */
  stats: z.array(companyStatSchema).min(1).max(12).optional(),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
