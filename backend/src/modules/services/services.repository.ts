import type { Prisma, Service } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export const servicesRepository = {
  list(): Promise<Service[]> {
    return prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  },

  findBySlug(slug: string): Promise<Service | null> {
    return prisma.service.findUnique({ where: { slug } });
  },

  findById(id: string): Promise<Service | null> {
    return prisma.service.findUnique({ where: { id } });
  },

  update(id: string, data: Prisma.ServiceUpdateInput): Promise<Service> {
    return prisma.service.update({ where: { id }, data });
  },
};
