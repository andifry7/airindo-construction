import { Router } from "express";
import { sendSuccess } from "../../shared/utils/response";
import { clientsService } from "../clients/clients.service";
import { companyService } from "../company/company.service";
import { contentService } from "../content/content.service";
import { projectsService } from "../projects/projects.service";
import { servicesService } from "../services/services.service";

export const sitePublicRouter = Router();

/**
 * GET /public/bootstrap
 * Satu permintaan untuk seluruh kebutuhan halaman publik (beranda, tentang,
 * layanan, kontak). Mengurangi jumlah request dan menjaga urutan render.
 */
sitePublicRouter.get("/bootstrap", async (_req, res) => {
  const [company, services, clients, featuredProjects, allProjects, highlights, aboutValues, ctaPoints, faqs, workshops] =
    await Promise.all([
      companyService.get(),
      servicesService.list(),
      clientsService.list({}),
      projectsService.listFeatured(6),
      projectsService.list({ page: 1, limit: 50 }),
      contentService.list("highlights"),
      contentService.list("about-values"),
      contentService.list("cta-points"),
      contentService.list("faqs"),
      contentService.list("workshops"),
    ]);

  sendSuccess(res, {
    company,
    services,
    clients,
    projects: {
      featured: featuredProjects,
      all: allProjects.items,
      total: allProjects.meta.total,
    },
    highlights,
    aboutValues,
    ctaPoints,
    faqs,
    workshops,
  });
});
