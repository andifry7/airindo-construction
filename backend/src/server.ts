import { createApp } from "./app";
import { env } from "./config/env";
import { checkDatabaseConnection, prisma } from "./shared/db/prisma";
import { logger } from "./shared/utils/logger";

async function bootstrap(): Promise<void> {
  const databaseOk = await checkDatabaseConnection();

  if (!databaseOk) {
    logger.warn(
      "Database belum bisa dijangkau. Server tetap dijalankan; /health akan melaporkan status degraded."
    );
  }

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(
      `API Airindo berjalan di http://localhost:${env.PORT} (${env.NODE_ENV})`
    );
  });

  const shutdown = (signal: string): void => {
    logger.info(`${signal} diterima — mematikan server dengan rapi...`);

    server.close(() => {
      void prisma.$disconnect().finally(() => process.exit(0));
    });

    // Jaring pengaman bila koneksi menggantung.
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  process.on("unhandledRejection", (reason) => {
    logger.error({ err: reason }, "Unhandled promise rejection");
  });
}

void bootstrap();
