import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { AppError } from "../../shared/errors/AppError";
import { validate } from "../../shared/middlewares/validate";
import { mediaController } from "./media.controller";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      callback(
        AppError.unprocessable(
          `Tipe file tidak didukung (${file.mimetype}). Gunakan JPG, PNG, WEBP, AVIF, atau SVG.`
        )
      );
      return;
    }
    callback(null, true);
  },
});

const mediaIdParamSchema = z.object({
  id: z.string().uuid("ID media tidak valid."),
});

export const mediaAdminRouter = Router();

mediaAdminRouter.get("/", mediaController.list);

mediaAdminRouter.post("/", upload.single("file"), mediaController.upload);

mediaAdminRouter.delete(
  "/:id",
  validate({ params: mediaIdParamSchema }),
  mediaController.remove
);
