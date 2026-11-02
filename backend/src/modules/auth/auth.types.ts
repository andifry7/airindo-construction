/** Bentuk data admin yang aman dikirim ke client (tanpa hash password). */
export interface PublicAdminUser {
  id: string;
  username: string;
  displayName: string;
  lastLoginAt: string | null;
}

export interface LoginResult {
  user: PublicAdminUser;
  /** Token JWT — hanya dipakai controller untuk set cookie, tidak pernah dikirim di body. */
  token: string;
  /** Umur sesi dalam detik. */
  expiresInSeconds: number;
}
