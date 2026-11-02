import { Router } from "express";
import { requireAuth } from "./shared/middlewares/requireAuth";
import { authRouter } from "./modules/auth/auth.routes";
import { clientsAdminRouter, clientsPublicRouter } from "./modules/clients/clients.routes";
import { companyAdminRouter, companyPublicRouter } from "./modules/company/company.routes";
import { contentAdminRouter, contentPublicRouter } from "./modules/content/content.routes";
import { dashboardAdminRouter } from "./modules/dashboard/dashboard.routes";
import { mediaAdminRouter } from "./modules/media/media.routes";
import { projectsAdminRouter, projectsPublicRouter } from "./modules/projects/projects.routes";
import { servicesAdminRouter, servicesPublicRouter } from "./modules/services/services.routes";
import { sitePublicRouter } from "./modules/site/site.routes";

/**
 * Peta seluruh API v1.
 * Publik  : /api/v1/public/*
 * Auth    : /api/v1/auth/*
 * Admin   : /api/v1/admin/*  (semua di belakang requireAuth)
 */
export const apiRouter = Router();

// ── Autentikasi ───────────────────────────────────────────────
apiRouter.use("/auth", authRouter);

// ── Publik ────────────────────────────────────────────────────
apiRouter.use("/public", sitePublicRouter);
apiRouter.use("/public/projects", projectsPublicRouter);
apiRouter.use("/public/services", servicesPublicRouter);
apiRouter.use("/public/clients", clientsPublicRouter);
apiRouter.use("/public/company", companyPublicRouter);
apiRouter.use("/public/content", contentPublicRouter);

// ── Admin (dilindungi) ────────────────────────────────────────
apiRouter.use("/admin", requireAuth);
apiRouter.use("/admin", dashboardAdminRouter);
apiRouter.use("/admin/projects", projectsAdminRouter);
apiRouter.use("/admin/services", servicesAdminRouter);
apiRouter.use("/admin/clients", clientsAdminRouter);
apiRouter.use("/admin/company", companyAdminRouter);
apiRouter.use("/admin/content", contentAdminRouter);
apiRouter.use("/admin/media", mediaAdminRouter);
