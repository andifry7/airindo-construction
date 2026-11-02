import { Router } from "express";
import { validate } from "../../shared/middlewares/validate";
import { contentController } from "./content.controller";
import { contentTypeParamSchema, replaceContentSchema } from "./content.schema";

export const contentPublicRouter = Router();

contentPublicRouter.get(
  "/:type",
  validate({ params: contentTypeParamSchema }),
  contentController.listPublic
);

export const contentAdminRouter = Router();

contentAdminRouter.get(
  "/:type",
  validate({ params: contentTypeParamSchema }),
  contentController.listAdmin
);

contentAdminRouter.put(
  "/:type",
  validate({ params: contentTypeParamSchema, body: replaceContentSchema }),
  contentController.replace
);
