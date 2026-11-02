import type { Client, Prisma } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";
import type { ListClientsQuery } from "./clients.schema";

export const clientsRepository = {
  list(query: ListClientsQuery): Promise<Client[]> {
    const where: Prisma.ClientWhereInput = {};

    if (query.sector && query.sector !== "Semua Sektor") {
      where.sector = query.sector;
    }
    if (query.q) {
      where.name = { contains: query.q, mode: "insensitive" };
    }

    return prisma.client.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  },

  findById(id: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { id } });
  },

  create(data: Prisma.ClientCreateInput): Promise<Client> {
    return prisma.client.create({ data });
  },

  update(id: string, data: Prisma.ClientUpdateInput): Promise<Client> {
    return prisma.client.update({ where: { id }, data });
  },

  delete(id: string): Promise<Client> {
    return prisma.client.delete({ where: { id } });
  },

  count(): Promise<number> {
    return prisma.client.count();
  },
};
