import type { AboutValue, CtaPoint, Faq, Highlight, Workshop } from "@prisma/client";
import { prisma } from "../../shared/db/prisma";
import type { ContentType } from "./content.schema";

export type ContentRecord = Faq | Workshop | Highlight | AboutValue | CtaPoint;

const bySortOrder = { sortOrder: "asc" } as const;

export const contentRepository = {
  list(type: ContentType): Promise<ContentRecord[]> {
    switch (type) {
      case "faqs":
        return prisma.faq.findMany({ orderBy: bySortOrder });
      case "workshops":
        return prisma.workshop.findMany({ orderBy: bySortOrder });
      case "highlights":
        return prisma.highlight.findMany({ orderBy: bySortOrder });
      case "about-values":
        return prisma.aboutValue.findMany({ orderBy: bySortOrder });
      case "cta-points":
        return prisma.ctaPoint.findMany({ orderBy: bySortOrder });
    }
  },

  replaceFaqs(items: Array<{ question: string; answer: string }>): Promise<Faq[]> {
    return prisma.$transaction(async (tx) => {
      await tx.faq.deleteMany({});
      if (items.length > 0) {
        await tx.faq.createMany({
          data: items.map((item, index) => ({ ...item, sortOrder: index })),
        });
      }
      return tx.faq.findMany({ orderBy: bySortOrder });
    });
  },

  replaceWorkshops(
    items: Array<{
      name: string;
      location: string;
      mapQuery?: string | null | undefined;
      mapsUrl?: string | null | undefined;
      features?: string | null | undefined;
    }>
  ): Promise<Workshop[]> {
    return prisma.$transaction(async (tx) => {
      await tx.workshop.deleteMany({});
      if (items.length > 0) {
        await tx.workshop.createMany({
          data: items.map((item, index) => ({
            name: item.name,
            location: item.location,
            mapQuery: item.mapQuery ?? null,
            mapsUrl: item.mapsUrl ?? null,
            features: item.features ?? null,
            sortOrder: index,
          })),
        });
      }
      return tx.workshop.findMany({ orderBy: bySortOrder });
    });
  },

  replaceHighlights(
    items: Array<{
      icon: string;
      title: string;
      text: string;
      badge?: string | null | undefined;
    }>
  ): Promise<Highlight[]> {
    return prisma.$transaction(async (tx) => {
      await tx.highlight.deleteMany({});
      if (items.length > 0) {
        await tx.highlight.createMany({
          data: items.map((item, index) => ({
            icon: item.icon,
            title: item.title,
            text: item.text,
            badge: item.badge ?? null,
            sortOrder: index,
          })),
        });
      }
      return tx.highlight.findMany({ orderBy: bySortOrder });
    });
  },

  replaceAboutValues(
    items: Array<{ icon: string; title: string; text: string }>
  ): Promise<AboutValue[]> {
    return prisma.$transaction(async (tx) => {
      await tx.aboutValue.deleteMany({});
      if (items.length > 0) {
        await tx.aboutValue.createMany({
          data: items.map((item, index) => ({ ...item, sortOrder: index })),
        });
      }
      return tx.aboutValue.findMany({ orderBy: bySortOrder });
    });
  },

  replaceCtaPoints(
    items: Array<{ icon: string; title: string; text: string }>
  ): Promise<CtaPoint[]> {
    return prisma.$transaction(async (tx) => {
      await tx.ctaPoint.deleteMany({});
      if (items.length > 0) {
        await tx.ctaPoint.createMany({
          data: items.map((item, index) => ({ ...item, sortOrder: index })),
        });
      }
      return tx.ctaPoint.findMany({ orderBy: bySortOrder });
    });
  },
};
