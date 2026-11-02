import type { Request } from "express";

export interface AuthenticatedUser {
  id: string;
  username: string;
  displayName: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export type AuthenticatedRequest = Request & { user: AuthenticatedUser };
