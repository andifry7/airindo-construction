import { Router } from "express";
import { prisma } from "../../shared/db/prisma";
import { sendSuccess } from "../../shared/utils/response";
import { clientsService } from "../clients/clients.service";
import { companyService } from "../company/company.service";
import { contentService } from "../content/content.service";
import { projectsService } from "../projects/projects.service";
import { servicesService } from "../services/services.service";

export const dashboardAdminRouter = Router();

/**
 * GET /admin/dashboard
 * Angka ringkas untuk kartu di halaman Ringkasan panel admin.
 * Semua dihitung dari database — bukan dari state browser seperti versi lama.
 */
dashboardAdminRouter.get("/dashboard", async (_req, res) => {
  const [projects, featuredProjects, clients, services, faqs, workshops, sectors] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.client.count(),
      prisma.service.count(),
      prisma.faq.count(),
      prisma.workshop.count(),
      prisma.client.findMany({ select: { sector: true }, distinct: ["sector"] }),
    ]);

  sendSuccess(res, {
    projects,
    featuredProjects,
    clients,
    services,
    faqs,
    workshops,
    sectors: sectors.length,
  });
});

/**
 * GET /admin/export
 * Cadangan JSON seluruh konten — pengganti tombol "Cadangkan JSON" lama
 * yang hanya membaca localStorage.
 */
dashboardAdminRouter.get("/export", async (_req, res) => {
  const [company, services, clients, projects, faqs, workshops, highlights, aboutValues, ctaPoints] =
    await Promise.all([
      companyService.get(),
      servicesService.list(),
      clientsService.list({}),
      projectsService.list({ page: 1, limit: 100 }),
      contentService.list("faqs"),
      contentService.list("workshops"),
      contentService.list("highlights"),
      contentService.list("about-values"),
      contentService.list("cta-points"),
    ]);

  sendSuccess(res, {
    exportedAt: new Date().toISOString(),
    company,
    services,
    clients,
    projects: projects.items,
    faqs,
    workshops,
    highlights,
    aboutValues,
    ctaPoints,
  });
});
