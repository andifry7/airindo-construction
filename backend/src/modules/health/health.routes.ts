import { Router } from "express";
import { checkDatabaseConnection } from "../../shared/db/prisma";

export const healthRouter = Router();

/**
 * GET /health
 * Dipakai untuk memastikan proses hidup DAN database bisa dijangkau.
 * Mengembalikan 503 bila database mati, supaya monitoring tidak salah lapor.
 */
healthRouter.get("/", async (_req, res) => {
  const databaseOk = await checkDatabaseConnection();

  res.status(databaseOk ? 200 : 503).json({
    success: databaseOk,
    data: {
      status: databaseOk ? "ok" : "degraded",
      database: databaseOk ? "connected" : "disconnected",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  });
});
