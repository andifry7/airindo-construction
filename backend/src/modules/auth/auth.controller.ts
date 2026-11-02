import type { Request, Response } from "express";
import { env, isProduction, SESSION_MAX_AGE_MS } from "../../config/env";
import { AppError } from "../../shared/errors/AppError";
import { sendSuccess } from "../../shared/utils/response";
import type { ChangePasswordInput, LoginInput } from "./auth.schema";
import { authService } from "./auth.service";

function baseCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProduction,
    path: "/",
  };
}

export const authController = {
  /** POST /auth/login */
  async login(req: Request, res: Response): Promise<void> {
    const input = req.body as LoginInput;
    const result = await authService.login(input);

    res.cookie(env.COOKIE_NAME, result.token, {
      ...baseCookieOptions(),
      maxAge: SESSION_MAX_AGE_MS,
    });

    // Token tidak pernah dikirim di body — hanya lewat cookie httpOnly.
    sendSuccess(res, {
      user: result.user,
      expiresInSeconds: result.expiresInSeconds,
    });
  },

  /** POST /auth/logout */
  async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie(env.COOKIE_NAME, baseCookieOptions());
    sendSuccess(res, { message: "Berhasil logout." });
  },

  /** GET /auth/me */
  async me(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw AppError.unauthorized();
    }
    const user = await authService.getProfile(req.user.id);
    sendSuccess(res, { user });
  },

  /** PATCH /auth/password */
  async changePassword(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw AppError.unauthorized();
    }

    await authService.changePassword(req.user.id, req.body as ChangePasswordInput);

    // token_version sudah naik → cookie lama tidak berguna, hapus sekalian.
    res.clearCookie(env.COOKIE_NAME, baseCookieOptions());

    sendSuccess(res, {
      message: "Password berhasil diubah. Silakan login ulang.",
    });
  },
};
