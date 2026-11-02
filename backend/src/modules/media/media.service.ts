import type { Media } from "@prisma/client";
import { AppError } from "../../shared/errors/AppError";
import { cloudinaryStorage } from "../../shared/storage/cloudinary.storage";
import { mediaRepository } from "./media.repository";

/** Folder yang diizinkan — sesuai keputusan client: hanya proyek & logo klien. */
export const allowedMediaFolders = ["projects", "clients"] as const;
export type MediaFolder = (typeof allowedMediaFolders)[number];

export const mediaService = {
  async upload(file: Express.Multer.File | undefined, folder: MediaFolder): Promise<Media> {
    if (!file) {
      throw AppError.badRequest("File wajib diunggah pada field 'file'.");
    }

    if (!cloudinaryStorage.isConfigured()) {
      throw AppError.internal(
        "Cloudinary belum dikonfigurasi. Isi kredensialnya di backend/.env."
      );
    }

    const uploaded = await cloudinaryStorage.upload(file.buffer, folder);

    return mediaRepository.create({
      provider: uploaded.provider,
      publicId: uploaded.publicId,
      url: uploaded.url,
      format: uploaded.format,
      width: uploaded.width,
      height: uploaded.height,
      bytes: uploaded.bytes,
      folder: uploaded.folder,
    });
  },

  async remove(id: string): Promise<void> {
    const media = await mediaRepository.findById(id);
    if (!media) {
      throw AppError.notFound("Media tidak ditemukan.");
    }

    await cloudinaryStorage.remove(media.publicId);
    await mediaRepository.delete(id);
  },

  list(limit?: number): Promise<Media[]> {
    return mediaRepository.list(limit);
  },
};
