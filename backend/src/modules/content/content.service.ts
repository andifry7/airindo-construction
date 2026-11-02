import { z } from "zod";
import { AppError } from "../../shared/errors/AppError";
import type { ContentRecord } from "./content.repository";
import { contentRepository } from "./content.repository";
import {
  aboutValueItemSchema,
  ctaPointItemSchema,
  faqItemSchema,
  highlightItemSchema,
  workshopItemSchema,
  type ContentType,
} from "./content.schema";

function parseItems<T extends z.ZodTypeAny>(schema: T, items: unknown[]): Array<z.infer<T>> {
  const result = z.array(schema).safeParse(items);
  if (!result.success) {
    throw AppError.unprocessable(
      "Data item tidak valid.",
      result.error.issues.map((issue) => ({
        field: `items.${issue.path.join(".")}`,
        message: issue.message,
      }))
    );
  }
  return result.data;
}

export const contentService = {
  list(type: ContentType): Promise<ContentRecord[]> {
    return contentRepository.list(type);
  },

  async replace(type: ContentType, rawItems: unknown[]): Promise<ContentRecord[]> {
    switch (type) {
      case "faqs":
        return contentRepository.replaceFaqs(parseItems(faqItemSchema, rawItems));
      case "workshops":
        return contentRepository.replaceWorkshops(parseItems(workshopItemSchema, rawItems));
      case "highlights":
        return contentRepository.replaceHighlights(parseItems(highlightItemSchema, rawItems));
      case "about-values":
        return contentRepository.replaceAboutValues(parseItems(aboutValueItemSchema, rawItems));
      case "cta-points":
        return contentRepository.replaceCtaPoints(parseItems(ctaPointItemSchema, rawItems));
    }
  },
};
