import { Router } from "express";
import { validate } from "../../shared/middlewares/validate";
import { projectsController } from "./projects.controller";
import {
  createProjectSchema,
  listProjectsQuerySchema,
  projectIdParamSchema,
  projectSlugParamSchema,
  toggleFeaturedSchema,
  updateProjectSchema,
} from "./projects.schema";

/** Route publik — tanpa autentikasi. */
export const projectsPublicRouter = Router();

projectsPublicRouter.get(
  "/",
  validate({ query: listProjectsQuerySchema }),
  projectsController.listPublic
);

projectsPublicRouter.get(
  "/:slug",
  validate({ params: projectSlugParamSchema }),
  projectsController.getPublic
);

/** Route admin — dipasang di belakang requireAuth oleh router pusat. */
export const projectsAdminRouter = Router();

projectsAdminRouter.get(
  "/",
  validate({ query: listProjectsQuerySchema }),
  projectsController.listAdmin
);

projectsAdminRouter.post("/", validate({ body: createProjectSchema }), projectsController.create);

projectsAdminRouter.patch(
  "/:id/featured",
  validate({ params: projectIdParamSchema, body: toggleFeaturedSchema }),
  projectsController.setFeatured
);

projectsAdminRouter.patch(
  "/:id",
  validate({ params: projectIdParamSchema, body: updateProjectSchema }),
  projectsController.update
);

projectsAdminRouter.delete(
  "/:id",
  validate({ params: projectIdParamSchema }),
  projectsController.remove
);
