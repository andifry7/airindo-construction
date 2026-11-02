import type { AdminUser } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

/**
 * Akses data untuk modul auth. Tidak ada logika bisnis di sini —
 * hanya query. Modul lain tidak boleh menyentuh tabel admin_users langsung.
 */
export const authRepository = {
  findByUsername(username: string): Promise<AdminUser | null> {
    return prisma.adminUser.findUnique({ where: { username } });
  },

  findById(id: string): Promise<AdminUser | null> {
    return prisma.adminUser.findUnique({ where: { id } });
  },

  touchLastLogin(id: string): Promise<AdminUser> {
    return prisma.adminUser.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  },

  /**
   * Menyimpan hash baru sekaligus menaikkan token_version,
   * sehingga semua JWT yang terlanjur diterbitkan langsung tidak berlaku.
   */
  updatePassword(id: string, passwordHash: string): Promise<AdminUser> {
    return prisma.adminUser.update({
      where: { id },
      data: {
        passwordHash,
        tokenVersion: { increment: 1 },
      },
    });
  },
};
