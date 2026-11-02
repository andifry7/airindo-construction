import pino from "pino";
import { isDevelopment } from "../../config/env";

/**
 * Logger terstruktur. Di development memakai pino-pretty bila tersedia,
 * di produksi mengeluarkan JSON agar mudah diolah tooling.
 */
export const logger = pino({
  level: isDevelopment ? "debug" : "info",
  base: undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isDevelopment
    ? {
        target: "pino/file",
        options: { destination: 1 },
      }
    : undefined,
});
