import { z } from "zod";

export const contentTypes = [
  "faqs",
  "workshops",
  "highlights",
  "about-values",
  "cta-points",
] as const;

export type ContentType = (typeof contentTypes)[number];

export const contentTypeParamSchema = z.object({
  type: z.enum(contentTypes, {
    errorMap: () => ({
      message: `Tipe konten harus salah satu dari: ${contentTypes.join(", ")}.`,
    }),
  }),
});

const optionalText = (max: number) =>
  z.string().trim().max(max, `Maksimal ${max} karakter.`).optional().nullable();

export const faqItemSchema = z.object({
  question: z.string().trim().min(5, "Pertanyaan minimal 5 karakter.").max(500),
  answer: z.string().trim().min(5, "Jawaban minimal 5 karakter.").max(5000),
});

export const workshopItemSchema = z.object({
  name: z.string().trim().min(3, "Nama workshop minimal 3 karakter.").max(180),
  location: z.string().trim().min(3, "Lokasi minimal 3 karakter.").max(500),
  mapQuery: optionalText(300),
  mapsUrl: optionalText(1000),
  features: optionalText(1000),
});

export const highlightItemSchema = z.object({
  icon: z.string().trim().min(1, "Ikon wajib diisi.").max(40),
  title: z.string().trim().min(3, "Judul minimal 3 karakter.").max(180),
  text: z.string().trim().min(5, "Teks minimal 5 karakter.").max(1000),
  badge: optionalText(100),
});

export const aboutValueItemSchema = z.object({
  icon: z.string().trim().min(1, "Ikon wajib diisi.").max(40),
  title: z.string().trim().min(3, "Judul minimal 3 karakter.").max(180),
  text: z.string().trim().min(5, "Teks minimal 5 karakter.").max(2000),
});

export const ctaPointItemSchema = z.object({
  icon: z.string().trim().min(1, "Ikon wajib diisi.").max(40),
  title: z.string().trim().min(3, "Judul minimal 3 karakter.").max(180),
  text: z.string().trim().min(3, "Teks minimal 3 karakter.").max(1000),
});

export const replaceContentSchema = z.object({
  items: z.array(z.unknown()).max(50, "Maksimal 50 item."),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
export type WorkshopItem = z.infer<typeof workshopItemSchema>;
export type HighlightItem = z.infer<typeof highlightItemSchema>;
export type AboutValueItem = z.infer<typeof aboutValueItemSchema>;
export type CtaPointItem = z.infer<typeof ctaPointItemSchema>;
