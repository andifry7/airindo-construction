import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";
import { isProduction } from "../../config/env";

/**
 * Satu-satunya tempat error diubah menjadi respons HTTP.
 * Controller/service cukup melempar AppError.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // 1. Error yang memang kita lempar sendiri
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
    });
    return;
  }

  // 2. Validasi Zod (biasanya sudah ditangani middleware validate, ini jaring pengaman)
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Data yang dikirim tidak valid.",
        details: err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
    return;
  }

  // 3. Error yang diketahui dari Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[] | undefined)?.join(", ") ?? "field";
      res.status(409).json({
        success: false,
        error: {
          code: "DUPLICATE_ENTRY",
          message: `Data dengan ${target} tersebut sudah ada.`,
        },
      });
      return;
    }

    if (err.code === "P2025") {
      res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Data tidak ditemukan." },
      });
      return;
    }
  }

  // 4. Sisanya dianggap bug
  logger.error({ err, method: req.method, url: req.originalUrl }, "Unhandled error");

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Terjadi kesalahan pada server.",
      ...(isProduction ? {} : { details: err instanceof Error ? err.message : String(err) }),
    },
  });
};
