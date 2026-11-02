import { Router } from "express";
import { validate } from "../../shared/middlewares/validate";
import { companyController } from "./company.controller";
import { updateCompanySchema } from "./company.schema";

export const companyPublicRouter = Router();

companyPublicRouter.get("/", companyController.getPublic);

export const companyAdminRouter = Router();

companyAdminRouter.get("/", companyController.getAdmin);
companyAdminRouter.put("/", validate({ body: updateCompanySchema }), companyController.update);
