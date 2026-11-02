import type { Client } from "@prisma/client";
import { AppError } from "../../shared/errors/AppError";
import { clientsRepository } from "./clients.repository";
import type { CreateClientInput, ListClientsQuery, UpdateClientInput } from "./clients.schema";

export const clientsService = {
  list(query: ListClientsQuery): Promise<Client[]> {
    return clientsRepository.list(query);
  },

  async create(input: CreateClientInput): Promise<Client> {
    return clientsRepository.create({
      name: input.name,
      sector: input.sector,
      logoUrl: input.logoUrl ?? null,
      logoPublicId: input.logoPublicId ?? null,
      sortOrder: input.sortOrder,
    });
  },

  async update(id: string, input: UpdateClientInput): Promise<Client> {
    const existing = await clientsRepository.findById(id);
    if (!existing) {
      throw AppError.notFound("Klien tidak ditemukan.");
    }

    return clientsRepository.update(id, {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.sector !== undefined ? { sector: input.sector } : {}),
      ...(input.logoUrl !== undefined ? { logoUrl: input.logoUrl } : {}),
      ...(input.logoPublicId !== undefined ? { logoPublicId: input.logoPublicId } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    });
  },

  async remove(id: string): Promise<void> {
    const existing = await clientsRepository.findById(id);
    if (!existing) {
      throw AppError.notFound("Klien tidak ditemukan.");
    }
    await clientsRepository.delete(id);
  },
};
