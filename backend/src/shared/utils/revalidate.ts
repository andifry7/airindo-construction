import { env } from "../../config/env";
import { logger } from "./logger";

/**
 * Memberi tahu frontend bahwa konten berubah, sehingga cache halaman publik
 * dibuang dan pengunjung melihat data terbaru.
 *
 * Sengaja tidak melempar error: kegagalan revalidasi tidak boleh menggagalkan
 * penyimpanan data yang sudah berhasil.
 */
export async function revalidateFrontend(): Promise<void> {
  if (!env.REVALIDATE_URL || !env.REVALIDATE_SECRET) {
    logger.debug("Revalidasi dilewati — REVALIDATE_URL/SECRET belum diatur.");
    return;
  }

  try {
    const response = await fetch(env.REVALIDATE_URL, {
      method: "POST",
      headers: { "x-revalidate-secret": env.REVALIDATE_SECRET },
    });

    if (!response.ok) {
      logger.warn({ status: response.status }, "Endpoint revalidasi menolak permintaan.");
      return;
    }

    logger.debug("Cache frontend berhasil direvalidasi.");
  } catch (error) {
    logger.warn({ err: error }, "Tidak bisa menghubungi endpoint revalidasi frontend.");
  }
}
