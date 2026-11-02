import type { Request, Response } from "express";
import { AppError } from "../../shared/errors/AppError";
import { sendCreated, sendSuccess } from "../../shared/utils/response";
import { allowedMediaFolders, mediaService, type MediaFolder } from "./media.service";

export const mediaController = {
  /** POST /admin/media — multipart/form-data: file, folder */
  async upload(req: Request, res: Response): Promise<void> {
    const rawFolder = typeof req.body?.folder === "string" ? req.body.folder : "projects";

    if (!allowedMediaFolders.includes(rawFolder as MediaFolder)) {
      throw AppError.badRequest(
        `Folder harus salah satu dari: ${allowedMediaFolders.join(", ")}.`
      );
    }

    const media = await mediaService.upload(req.file, rawFolder as MediaFolder);
    sendCreated(res, media);
  },

  /** GET /admin/media */
  async list(_req: Request, res: Response): Promise<void> {
    sendSuccess(res, await mediaService.list());
  },

  /** DELETE /admin/media/:id */
  async remove(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.params as { id: string };
    await mediaService.remove(id);
    sendSuccess(res, { message: "Media berhasil dihapus." });
  },
};
