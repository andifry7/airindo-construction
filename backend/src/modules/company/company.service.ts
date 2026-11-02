import type { CompanyProfile, CompanyStat } from "@prisma/client";
import { AppError } from "../../shared/errors/AppError";
import { revalidateFrontend } from "../../shared/utils/revalidate";
import { companyRepository } from "./company.repository";
import type { UpdateCompanyInput } from "./company.schema";

export interface CompanyPayload {
  profile: CompanyProfile;
  stats: CompanyStat[];
}

export const companyService = {
  async get(): Promise<CompanyPayload> {
    const profile = await companyRepository.findProfile();
    if (!profile) {
      throw AppError.notFound(
        "Profil perusahaan belum ada. Jalankan `npm run db:seed` untuk mengisi data awal."
      );
    }
    const stats = await companyRepository.listStats();
    return { profile, stats };
  },

  async update(input: UpdateCompanyInput): Promise<CompanyPayload> {
    const profile = await companyRepository.findProfile();
    if (!profile) {
      throw AppError.notFound(
        "Profil perusahaan belum ada. Jalankan `npm run db:seed` untuk mengisi data awal."
      );
    }

    const { stats, ...profileFields } = input;

    const updatedProfile = await companyRepository.updateProfile({
      ...(profileFields.name !== undefined ? { name: profileFields.name } : {}),
      ...(profileFields.fullName !== undefined ? { fullName: profileFields.fullName } : {}),
      ...(profileFields.tagline !== undefined ? { tagline: profileFields.tagline } : {}),
      ...(profileFields.phone !== undefined ? { phone: profileFields.phone } : {}),
      ...(profileFields.phoneRaw !== undefined ? { phoneRaw: profileFields.phoneRaw } : {}),
      ...(profileFields.email !== undefined ? { email: profileFields.email } : {}),
      ...(profileFields.address !== undefined ? { address: profileFields.address } : {}),
      ...(profileFields.mapQuery !== undefined ? { mapQuery: profileFields.mapQuery } : {}),
      ...(profileFields.mapsUrl !== undefined ? { mapsUrl: profileFields.mapsUrl } : {}),
      ...(profileFields.establishedYear !== undefined
        ? { establishedYear: profileFields.establishedYear }
        : {}),
      ...(profileFields.workshopAddress !== undefined
        ? { workshopAddress: profileFields.workshopAddress }
        : {}),
    });

    const updatedStats = stats
      ? await companyRepository.replaceStats(stats)
      : await companyRepository.listStats();

    void revalidateFrontend();
    return { profile: updatedProfile, stats: updatedStats };
  },
};
