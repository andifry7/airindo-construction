import { z } from "zod";
import { AppError } from "../../shared/errors/AppError";
import { revalidateFrontend } from "../../shared/utils/revalidate";
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
    let result: ContentRecord[];

    switch (type) {
      case "faqs":
        result = await contentRepository.replaceFaqs(parseItems(faqItemSchema, rawItems));
        break;
      case "workshops":
        result = await contentRepository.replaceWorkshops(parseItems(workshopItemSchema, rawItems));
        break;
      case "highlights":
        result = await contentRepository.replaceHighlights(parseItems(highlightItemSchema, rawItems));
        break;
      case "about-values":
        result = await contentRepository.replaceAboutValues(
          parseItems(aboutValueItemSchema, rawItems)
        );
        break;
      case "cta-points":
        result = await contentRepository.replaceCtaPoints(parseItems(ctaPointItemSchema, rawItems));
        break;
    }

    void revalidateFrontend();
    return result;
  },
};
