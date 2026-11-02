import { revalidateTag } from "next/cache";
import { CONTENT_CACHE_TAG } from "@/lib/site-content";

/**
 * POST /api/revalidate
 *
 * Dipanggil backend setelah admin menyimpan perubahan, supaya halaman publik
 * yang di-cache segera mengambil data baru. Dilindungi secret bersama.
 *
 * Header: x-revalidate-secret
 */
export async function POST(request) {
  const expectedSecret = process.env.REVALIDATE_SECRET;
  const providedSecret = request.headers.get("x-revalidate-secret");

  if (!expectedSecret) {
    return Response.json(
      {
        success: false,
        error: {
          code: "NOT_CONFIGURED",
          message: "REVALIDATE_SECRET belum diatur di environment frontend.",
        },
      },
      { status: 500 }
    );
  }

  if (providedSecret !== expectedSecret) {
    return Response.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: "Secret revalidasi tidak valid." },
      },
      { status: 401 }
    );
  }

  revalidateTag(CONTENT_CACHE_TAG, "max");

  return Response.json({
    success: true,
    data: { revalidated: true, tag: CONTENT_CACHE_TAG },
  });
}
