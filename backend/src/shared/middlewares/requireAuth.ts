import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { prisma } from "../db/prisma";
import { AppError } from "../errors/AppError";

export interface AccessTokenPayload {
  sub: string;
  tv: number;
}

/**
 * Middleware proteksi route admin.
 * Memverifikasi JWT dari cookie httpOnly, lalu memastikan `token_version`
 * di token masih sama dengan yang ada di database. Dengan begitu, mengganti
 * password langsung membatalkan semua token lama meski JWT belum kedaluwarsa.
 */
export const requireAuth: RequestHandler = async (req, _res, next) => {
  try {
    const token: unknown = req.cookies?.[env.COOKIE_NAME];

    if (typeof token !== "string" || token.length === 0) {
      throw AppError.unauthorized("Anda belum login.");
    }

    let payload: AccessTokenPayload;
    try {
      payload = jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
    } catch {
      throw AppError.unauthorized("Sesi Anda tidak valid atau sudah kedaluwarsa.");
    }

    if (!payload.sub || typeof payload.tv !== "number") {
      throw AppError.unauthorized("Sesi Anda tidak valid.");
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        username: true,
        displayName: true,
        tokenVersion: true,
      },
    });

    if (!user) {
      throw AppError.unauthorized("Akun tidak ditemukan.");
    }

    if (user.tokenVersion !== payload.tv) {
      throw AppError.unauthorized("Sesi sudah tidak berlaku. Silakan login ulang.");
    }

    req.user = {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    };

    next();
  } catch (error) {
    next(error);
  }
};
