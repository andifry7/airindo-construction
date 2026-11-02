import type { Request, Response } from "express";
import { sendCreated, sendSuccess } from "../../shared/utils/response";
import type { CreateClientInput, ListClientsQuery, UpdateClientInput } from "./clients.schema";
import { clientsService } from "./clients.service";

export const clientsController = {
  /** GET /public/clients */
  async listPublic(_req: Request, res: Response): Promise<void> {
    const query = res.locals.query as ListClientsQuery;
    sendSuccess(res, await clientsService.list(query));
  },

  /** GET /admin/clients */
  async listAdmin(_req: Request, res: Response): Promise<void> {
    const query = res.locals.query as ListClientsQuery;
    sendSuccess(res, await clientsService.list(query));
  },

  /** POST /admin/clients */
  async create(req: Request, res: Response): Promise<void> {
    sendCreated(res, await clientsService.create(req.body as CreateClientInput));
  },

  /** PATCH /admin/clients/:id */
  async update(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.params as { id: string };
    sendSuccess(res, await clientsService.update(id, req.body as UpdateClientInput));
  },

  /** DELETE /admin/clients/:id */
  async remove(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.params as { id: string };
    await clientsService.remove(id);
    sendSuccess(res, { message: "Klien berhasil dihapus." });
  },
};
