/**
 * Klien API untuk panel admin (berjalan di browser).
 *
 * `credentials: "include"` wajib agar cookie httpOnly ikut terkirim.
 * Bila frontend & backend berada di satu domain (lewat reverse proxy),
 * NEXT_PUBLIC_API_BASE_URL boleh dikosongkan sehingga request memakai
 * origin yang sama.
 */
const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  /** True bila penyebabnya sesi tidak valid/kedaluwarsa. */
  get isUnauthorized() {
    return this.status === 401;
  }
}

async function request(path, { method = "GET", body, signal } = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}/api/v1${path}`, {
      method,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new ApiError(
      "Tidak bisa menghubungi server. Pastikan backend berjalan.",
      0,
      "NETWORK_ERROR"
    );
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    const apiError = payload?.error ?? {};
    throw new ApiError(
      apiError.message || `Permintaan gagal (HTTP ${response.status}).`,
      response.status,
      apiError.code,
      apiError.details
    );
  }

  return payload.data;
}

export const authApi = {
  login(username, password) {
    return request("/auth/login", { method: "POST", body: { username, password } });
  },

  logout() {
    return request("/auth/logout", { method: "POST" });
  },

  me() {
    return request("/auth/me");
  },

  changePassword(currentPassword, newPassword) {
    return request("/auth/password", {
      method: "PATCH",
      body: { currentPassword, newPassword },
    });
  },
};
