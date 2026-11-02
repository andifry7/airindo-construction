import { PrismaClient } from "@prisma/client";
import { isDevelopment } from "../../config/env";
import { logger } from "../utils/logger";

/**
 * Satu instance PrismaClient untuk seluruh aplikasi.
 * Disimpan di globalThis saat development agar `tsx watch` tidak membuat
 * koneksi baru setiap kali proses di-restart.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isDevelopment ? ["warn", "error"] : ["error"],
  });

if (isDevelopment) {
  globalForPrisma.prisma = prisma;
}

/** Dipakai endpoint /health untuk memastikan database benar-benar bisa dijangkau. */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error({ err: error }, "Koneksi database gagal");
    return false;
  }
}
