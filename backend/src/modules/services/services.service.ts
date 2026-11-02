import type { Service } from "@prisma/client";
import { AppError } from "../../shared/errors/AppError";
import { servicesRepository } from "./services.repository";
import type { UpdateServiceInput } from "./services.schema";

export const servicesService = {
  list(): Promise<Service[]> {
    return servicesRepository.list();
  },

  async getBySlug(slug: string): Promise<Service> {
    const service = await servicesRepository.findBySlug(slug);
    if (!service) {
      throw AppError.notFound("Layanan tidak ditemukan.");
    }
    return service;
  },

  async update(id: string, input: UpdateServiceInput): Promise<Service> {
    const existing = await servicesRepository.findById(id);
    if (!existing) {
      throw AppError.notFound("Layanan tidak ditemukan.");
    }

    return servicesRepository.update(id, {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.shortTitle !== undefined ? { shortTitle: input.shortTitle } : {}),
      ...(input.icon !== undefined ? { icon: input.icon } : {}),
      ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl } : {}),
      ...(input.imagePublicId !== undefined ? { imagePublicId: input.imagePublicId } : {}),
      ...(input.badge !== undefined ? { badge: input.badge } : {}),
      ...(input.lead !== undefined ? { lead: input.lead } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.scopePoints !== undefined ? { scopePoints: input.scopePoints } : {}),
      ...(input.standards !== undefined ? { standards: input.standards } : {}),
      ...(input.caseHighlight !== undefined ? { caseHighlight: input.caseHighlight } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    });
  },
};
