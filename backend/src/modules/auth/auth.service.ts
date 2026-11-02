import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { AdminUser } from "@prisma/client";
import { env, SESSION_MAX_AGE_MS } from "../../config/env";
import { AppError } from "../../shared/errors/AppError";
import { authRepository } from "./auth.repository";
import type { ChangePasswordInput, LoginInput } from "./auth.schema";
import type { LoginResult, PublicAdminUser } from "./auth.types";

const BCRYPT_ROUNDS = 12;

/**
 * Hash tiruan untuk menyamakan waktu respons ketika username tidak ditemukan,
 * sehingga penyerang tidak bisa menebak username dari selisih waktu.
 */
let dummyHash: string | null = null;
function getDummyHash(): string {
  if (!dummyHash) {
    dummyHash = bcrypt.hashSync("airindo-timing-placeholder", 10);
  }
  return dummyHash;
}

function signAccessToken(user: AdminUser): string {
  return jwt.sign({ tv: user.tokenVersion }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

function toPublicUser(user: AdminUser): PublicAdminUser {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
  };
}

export const authService = {
  async login(input: LoginInput): Promise<LoginResult> {
    const user = await authRepository.findByUsername(input.username);
    const invalidCredentials = AppError.unauthorized("Username atau password salah.");

    if (!user) {
      // Tetap jalankan bcrypt.compare agar waktu respons serupa.
      await bcrypt.compare(input.password, getDummyHash());
      throw invalidCredentials;
    }

    const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
    if (!passwordMatches) {
      throw invalidCredentials;
    }

    const updatedUser = await authRepository.touchLastLogin(user.id);

    return {
      user: toPublicUser(updatedUser),
      token: signAccessToken(updatedUser),
      expiresInSeconds: Math.floor(SESSION_MAX_AGE_MS / 1000),
    };
  },

  async getProfile(userId: string): Promise<PublicAdminUser> {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw AppError.unauthorized("Akun tidak ditemukan.");
    }
    return toPublicUser(user);
  },

  async changePassword(userId: string, input: ChangePasswordInput): Promise<void> {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw AppError.unauthorized("Akun tidak ditemukan.");
    }

    const currentMatches = await bcrypt.compare(input.currentPassword, user.passwordHash);
    if (!currentMatches) {
      throw AppError.badRequest("Password saat ini salah.");
    }

    const newHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS);
    await authRepository.updatePassword(user.id, newHash);
  },
};
