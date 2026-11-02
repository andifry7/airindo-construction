import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response";
import type { ContentType } from "./content.schema";
import { contentService } from "./content.service";

export const contentController = {
  /** GET /public/content/:type */
  async listPublic(_req: Request, res: Response): Promise<void> {
    const { type } = res.locals.params as { type: ContentType };
    sendSuccess(res, await contentService.list(type));
  },

  /** GET /admin/content/:type */
  async listAdmin(_req: Request, res: Response): Promise<void> {
    const { type } = res.locals.params as { type: ContentType };
    sendSuccess(res, await contentService.list(type));
  },

  /** PUT /admin/content/:type */
  async replace(req: Request, res: Response): Promise<void> {
    const { type } = res.locals.params as { type: ContentType };
    const { items } = req.body as { items: unknown[] };
    sendSuccess(res, await contentService.replace(type, items));
  },
};
