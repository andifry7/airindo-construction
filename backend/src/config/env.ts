import "dotenv/config";
import { z } from "zod";

/**
 * Validasi environment variable saat boot.
 * Aplikasi sengaja gagal cepat (fail fast) bila konfigurasi wajib tidak ada,
 * supaya tidak berjalan dengan nilai default yang berbahaya.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL wajib diisi"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET minimal 32 karakter"),
  JWT_EXPIRES_IN: z.string().default("24h"),
  COOKIE_NAME: z.string().default("airindo_session"),

  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_FOLDER: z.string().default("airindo"),

  REVALIDATE_URL: z.string().optional(),
  REVALIDATE_SECRET: z.string().optional(),

  SEED_ADMIN_USERNAME: z.string().default("admin-airindo"),
  SEED_ADMIN_PASSWORD: z.string().default("airindo123123"),
  SEED_ADMIN_NAME: z.string().default("Administrator Airindo"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  // eslint-disable-next-line no-console
  console.error(`\n[env] Konfigurasi environment tidak valid:\n${issues}\n`);
  process.exit(1);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";
export const isDevelopment = env.NODE_ENV === "development";

/** Umur cookie & token dalam milidetik — mengikuti JWT_EXPIRES_IN (default 24 jam). */
export const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;
