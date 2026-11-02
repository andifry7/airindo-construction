import { Router } from "express";
import { validate } from "../../shared/middlewares/validate";
import { servicesController } from "./services.controller";
import {
  serviceIdParamSchema,
  serviceSlugParamSchema,
  updateServiceSchema,
} from "./services.schema";

export const servicesPublicRouter = Router();

servicesPublicRouter.get("/", servicesController.listPublic);
servicesPublicRouter.get(
  "/:slug",
  validate({ params: serviceSlugParamSchema }),
  servicesController.getPublic
);

export const servicesAdminRouter = Router();

servicesAdminRouter.get("/", servicesController.listAdmin);
servicesAdminRouter.patch(
  "/:id",
  validate({ params: serviceIdParamSchema, body: updateServiceSchema }),
  servicesController.update
);
