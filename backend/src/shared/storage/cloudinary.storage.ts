import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { env } from "../../config/env";
import { AppError } from "../errors/AppError";

/**
 * Adapter storage. Saat ini hanya Cloudinary; bila nanti pindah ke MinIO/S3,
 * cukup tambahkan implementasi lain dengan bentuk hasil yang sama.
 */
export interface UploadedFile {
  provider: string;
  publicId: string;
  url: string;
  format: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  folder: string | null;
}

function assertConfigured(): void {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw AppError.internal(
      "Cloudinary belum dikonfigurasi. Isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET di .env."
    );
  }

  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export const cloudinaryStorage = {
  isConfigured(): boolean {
    return Boolean(
      env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET
    );
  },

  upload(buffer: Buffer, subfolder: string): Promise<UploadedFile> {
    assertConfigured();

    const folder = `${env.CLOUDINARY_FOLDER}/${subfolder}`;

    return new Promise<UploadedFile>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "image", overwrite: false },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            reject(AppError.internal(`Upload ke Cloudinary gagal: ${error?.message ?? "tanpa hasil"}`));
            return;
          }

          resolve({
            provider: "cloudinary",
            publicId: result.public_id,
            url: result.secure_url,
            format: result.format ?? null,
            width: result.width ?? null,
            height: result.height ?? null,
            bytes: result.bytes ?? null,
            folder,
          });
        }
      );

      stream.end(buffer);
    });
  },

  async remove(publicId: string): Promise<void> {
    assertConfigured();
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch {
      // Gagal hapus di storage tidak boleh menggagalkan permintaan;
      // baris database tetap dihapus oleh service.
    }
  },
};
