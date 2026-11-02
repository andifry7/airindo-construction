import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response";
import type { UpdateServiceInput } from "./services.schema";
import { servicesService } from "./services.service";

export const servicesController = {
  /** GET /public/services */
  async listPublic(_req: Request, res: Response): Promise<void> {
    sendSuccess(res, await servicesService.list());
  },

  /** GET /public/services/:slug */
  async getPublic(_req: Request, res: Response): Promise<void> {
    const { slug } = res.locals.params as { slug: string };
    sendSuccess(res, await servicesService.getBySlug(slug));
  },

  /** GET /admin/services */
  async listAdmin(_req: Request, res: Response): Promise<void> {
    sendSuccess(res, await servicesService.list());
  },

  /** PATCH /admin/services/:id */
  async update(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.params as { id: string };
    const input = req.body as UpdateServiceInput;
    sendSuccess(res, await servicesService.update(id, input));
  },
};
