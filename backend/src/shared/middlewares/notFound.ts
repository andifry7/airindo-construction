import type { RequestHandler } from "express";
import { AppError } from "../errors/AppError";

/** Menangkap semua route yang tidak dikenal dan meneruskannya ke error handler. */
export const notFound: RequestHandler = (req, _res, next) => {
  next(AppError.notFound(`Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`));
};
