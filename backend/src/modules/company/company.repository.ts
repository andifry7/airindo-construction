import type { CompanyProfile, CompanyStat, Prisma } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export const COMPANY_SINGLETON_ID = "singleton";

export const companyRepository = {
  findProfile(): Promise<CompanyProfile | null> {
    return prisma.companyProfile.findUnique({ where: { id: COMPANY_SINGLETON_ID } });
  },

  listStats(): Promise<CompanyStat[]> {
    return prisma.companyStat.findMany({ orderBy: [{ sortOrder: "asc" }] });
  },

  updateProfile(data: Prisma.CompanyProfileUpdateInput): Promise<CompanyProfile> {
    return prisma.companyProfile.update({ where: { id: COMPANY_SINGLETON_ID }, data });
  },

  createProfile(data: Omit<Prisma.CompanyProfileCreateInput, "id">): Promise<CompanyProfile> {
    return prisma.companyProfile.create({
      data: { id: COMPANY_SINGLETON_ID, ...data },
    });
  },

  /** Ganti seluruh statistik dalam satu transaksi agar tidak ada data setengah jadi. */
  async replaceStats(
    stats: Array<{ value: string; label: string; detail?: string | null }>
  ): Promise<CompanyStat[]> {
    return prisma.$transaction(async (tx) => {
      await tx.companyStat.deleteMany({});
      await tx.companyStat.createMany({
        data: stats.map((stat, index) => ({
          value: stat.value,
          label: stat.label,
          detail: stat.detail ?? null,
          sortOrder: index,
        })),
      });
      return tx.companyStat.findMany({ orderBy: [{ sortOrder: "asc" }] });
    });
  },

  countStats(): Promise<number> {
    return prisma.companyStat.count();
  },
};
