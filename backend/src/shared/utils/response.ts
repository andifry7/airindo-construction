import type { Response } from "express";

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
}

/**
 * Format respons seragam untuk seluruh API.
 *   sukses → { success: true, data, meta? }
 *   gagal  → { success: false, error: { code, message, details? } }
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: ApiMeta
): Response {
  return res.status(statusCode).json({
    success: true,
    data,
    ...(meta ? { meta } : {}),
  });
}

export function sendCreated<T>(res: Response, data: T, meta?: ApiMeta): Response {
  return sendSuccess(res, data, 201, meta);
}

export function sendNoContent(res: Response): Response {
  return res.status(204).send();
}
