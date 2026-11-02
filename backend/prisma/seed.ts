import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BCRYPT_ROUNDS = 12;

/**
 * Seeder akun admin.
 * Idempoten: kalau username sudah ada, data TIDAK ditimpa
 * (supaya password produksi tidak tidak sengaja ter-reset).
 */
async function main(): Promise<void> {
  const username = process.env.SEED_ADMIN_USERNAME ?? "admin-airindo";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "airindo123123";
  const displayName = process.env.SEED_ADMIN_NAME ?? "Administrator Airindo";

  const existing = await prisma.adminUser.findUnique({ where: { username } });

  if (existing) {
    console.log(`[seed] Admin "${username}" sudah ada — dilewati (tidak diubah).`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  await prisma.adminUser.create({
    data: { username, passwordHash, displayName },
  });

  console.log(`[seed] Admin "${username}" berhasil dibuat.`);
  console.log("[seed] Ingat: ganti password default sebelum produksi.");
}

main()
  .catch((error) => {
    console.error("[seed] Gagal:", error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
