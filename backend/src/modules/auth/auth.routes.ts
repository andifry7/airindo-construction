import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../../shared/middlewares/requireAuth";
import { validate } from "../../shared/middlewares/validate";
import { authController } from "./auth.controller";
import { changePasswordSchema, loginSchema } from "./auth.schema";

/** Batasi percobaan login: 5 kali gagal per 15 menit per IP. */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit.",
    },
  },
});

export const authRouter = Router();

authRouter.post("/login", loginLimiter, validate({ body: loginSchema }), authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/me", requireAuth, authController.me);
authRouter.patch(
  "/password",
  requireAuth,
  validate({ body: changePasswordSchema }),
  authController.changePassword
);
