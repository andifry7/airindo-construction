import type { Media, Prisma } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";

export const mediaRepository = {
  create(data: Prisma.MediaCreateInput): Promise<Media> {
    return prisma.media.create({ data });
  },

  findById(id: string): Promise<Media | null> {
    return prisma.media.findUnique({ where: { id } });
  },

  delete(id: string): Promise<Media> {
    return prisma.media.delete({ where: { id } });
  },

  list(limit = 50): Promise<Media[]> {
    return prisma.media.findMany({ orderBy: { createdAt: "desc" }, take: limit });
  },
};
