import { Router } from "express";
import { validate } from "../../shared/middlewares/validate";
import { clientsController } from "./clients.controller";
import {
  clientIdParamSchema,
  createClientSchema,
  listClientsQuerySchema,
  updateClientSchema,
} from "./clients.schema";

export const clientsPublicRouter = Router();

clientsPublicRouter.get(
  "/",
  validate({ query: listClientsQuerySchema }),
  clientsController.listPublic
);

export const clientsAdminRouter = Router();

clientsAdminRouter.get(
  "/",
  validate({ query: listClientsQuerySchema }),
  clientsController.listAdmin
);

clientsAdminRouter.post("/", validate({ body: createClientSchema }), clientsController.create);

clientsAdminRouter.patch(
  "/:id",
  validate({ params: clientIdParamSchema, body: updateClientSchema }),
  clientsController.update
);

clientsAdminRouter.delete(
  "/:id",
  validate({ params: clientIdParamSchema }),
  clientsController.remove
);
