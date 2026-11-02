import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { env } from "./config/env";
import { errorHandler } from "./shared/middlewares/errorHandler";
import { notFound } from "./shared/middlewares/notFound";
import { logger } from "./shared/utils/logger";
import { authRouter } from "./modules/auth/auth.routes";
import { healthRouter } from "./modules/health/health.routes";

/** Origin yang diizinkan, dipisah koma di env bila lebih dari satu. */
function resolveCorsOrigins(): string[] {
  return env.CORS_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");

  // Di produksi aplikasi berada di belakang Nginx, jadi 1 hop proxy dipercaya.
  app.set("trust proxy", 1);

  app.use(helmet());

  app.use(
    pinoHttp({
      logger,
      autoLogging: {
        ignore: (req) => req.url === "/health",
      },
    })
  );

  app.use(
    cors({
      origin: resolveCorsOrigins(),
      credentials: true,
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    })
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser());

  // ── Routes ────────────────────────────────────────────────
  app.use("/health", healthRouter);
  app.use("/api/v1/auth", authRouter);

  // ── Fallback ──────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
