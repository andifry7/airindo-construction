import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username wajib diisi." })
    .trim()
    .min(1, "Username wajib diisi.")
    .max(64, "Username maksimal 64 karakter."),
  password: z
    .string({ required_error: "Password wajib diisi." })
    .min(1, "Password wajib diisi.")
    .max(200, "Password terlalu panjang."),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Password saat ini wajib diisi." })
      .min(1, "Password saat ini wajib diisi."),
    newPassword: z
      .string({ required_error: "Password baru wajib diisi." })
      .min(8, "Password baru minimal 8 karakter.")
      .max(200, "Password baru terlalu panjang."),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Password baru harus berbeda dari password saat ini.",
    path: ["newPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
