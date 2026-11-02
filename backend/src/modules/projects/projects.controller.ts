import type { Request, Response } from "express";
import { sendCreated, sendSuccess } from "../../shared/utils/response";
import type { CreateProjectInput, ListProjectsQuery, UpdateProjectInput } from "./projects.schema";
import { projectsService } from "./projects.service";

export const projectsController = {
  /** GET /public/projects */
  async listPublic(_req: Request, res: Response): Promise<void> {
    const query = res.locals.query as ListProjectsQuery;
    const { items, meta } = await projectsService.list(query);
    sendSuccess(res, items, 200, meta);
  },

  /** GET /public/projects/:slug */
  async getPublic(_req: Request, res: Response): Promise<void> {
    const { slug } = res.locals.params as { slug: string };
    const project = await projectsService.getBySlug(slug);
    sendSuccess(res, project);
  },

  /** GET /admin/projects */
  async listAdmin(_req: Request, res: Response): Promise<void> {
    const query = res.locals.query as ListProjectsQuery;
    const { items, meta } = await projectsService.list(query);
    sendSuccess(res, items, 200, meta);
  },

  /** POST /admin/projects */
  async create(req: Request, res: Response): Promise<void> {
    const input = req.body as CreateProjectInput;
    const project = await projectsService.create(input);
    sendCreated(res, project);
  },

  /** PATCH /admin/projects/:id */
  async update(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.params as { id: string };
    const input = req.body as UpdateProjectInput;
    const project = await projectsService.update(id, input);
    sendSuccess(res, project);
  },

  /** PATCH /admin/projects/:id/featured */
  async setFeatured(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.params as { id: string };
    const { featured } = req.body as { featured: boolean };
    const project = await projectsService.setFeatured(id, featured);
    sendSuccess(res, project);
  },

  /** DELETE /admin/projects/:id */
  async remove(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.params as { id: string };
    await projectsService.remove(id);
    sendSuccess(res, { message: "Proyek berhasil dihapus." });
  },
};
