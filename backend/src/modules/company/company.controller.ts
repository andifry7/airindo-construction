import type { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response";
import type { UpdateCompanyInput } from "./company.schema";
import { companyService } from "./company.service";

export const companyController = {
  /** GET /public/company */
  async getPublic(_req: Request, res: Response): Promise<void> {
    sendSuccess(res, await companyService.get());
  },

  /** GET /admin/company */
  async getAdmin(_req: Request, res: Response): Promise<void> {
    sendSuccess(res, await companyService.get());
  },

  /** PUT /admin/company */
  async update(req: Request, res: Response): Promise<void> {
    sendSuccess(res, await companyService.update(req.body as UpdateCompanyInput));
  },
};
