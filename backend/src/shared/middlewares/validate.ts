import type { RequestHandler } from "express";
import { ZodError, type ZodTypeAny } from "zod";
import { AppError } from "../errors/AppError";

interface ValidationSchemas {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

/**
 * Validasi input dengan Zod.
 * - `body` hasil parse-nya menggantikan req.body (aman, objek biasa).
 * - `query` & `params` hasil parse-nya disimpan di res.locals, karena di
 *   Express 5 `req.query` adalah getter yang tidak bisa di-assign.
 */
export const validate =
  (schemas: ValidationSchemas): RequestHandler =>
  (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        res.locals.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        res.locals.query = schemas.query.parse(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          AppError.unprocessable(
            "Data yang dikirim tidak valid.",
            error.issues.map((issue) => ({
              field: issue.path.join(".") || "(root)",
              message: issue.message,
            }))
          )
        );
        return;
      }
      next(error);
    }
  };
