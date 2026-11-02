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

function buildQuery(params) {
  if (!params) return "";
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

async function parseResponse(response) {
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

  return payload;
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

  const payload = await parseResponse(response);
  return payload.data;
}

/** Upload multipart — Content-Type dibiarkan diatur browser (boundary). */
async function uploadFile(file, folder) {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);

  let response;
  try {
    response = await fetch(`${BASE_URL}/api/v1/admin/media`, {
      method: "POST",
      credentials: "include",
      body: form,
    });
  } catch {
    throw new ApiError("Tidak bisa menghubungi server saat mengunggah.", 0, "NETWORK_ERROR");
  }

  const payload = await parseResponse(response);
  return payload.data;
}

// ─────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// Konten (admin)
// ─────────────────────────────────────────────────────────────

export const adminApi = {
  projects: {
    list(params) {
      return request(`/admin/projects${buildQuery(params)}`);
    },
    create(data) {
      return request("/admin/projects", { method: "POST", body: data });
    },
    update(id, data) {
      return request(`/admin/projects/${id}`, { method: "PATCH", body: data });
    },
    setFeatured(id, featured) {
      return request(`/admin/projects/${id}/featured`, {
        method: "PATCH",
        body: { featured },
      });
    },
    remove(id) {
      return request(`/admin/projects/${id}`, { method: "DELETE" });
    },
  },

  clients: {
    list(params) {
      return request(`/admin/clients${buildQuery(params)}`);
    },
    create(data) {
      return request("/admin/clients", { method: "POST", body: data });
    },
    update(id, data) {
      return request(`/admin/clients/${id}`, { method: "PATCH", body: data });
    },
    remove(id) {
      return request(`/admin/clients/${id}`, { method: "DELETE" });
    },
  },

  services: {
    list() {
      return request("/admin/services");
    },
    update(id, data) {
      return request(`/admin/services/${id}`, { method: "PATCH", body: data });
    },
  },

  company: {
    get() {
      return request("/admin/company");
    },
    update(data) {
      return request("/admin/company", { method: "PUT", body: data });
    },
  },

  content: {
    list(type) {
      return request(`/admin/content/${type}`);
    },
    replace(type, items) {
      return request(`/admin/content/${type}`, { method: "PUT", body: { items } });
    },
  },

  media: {
    upload(file, folder) {
      return uploadFile(file, folder);
    },
    remove(id) {
      return request(`/admin/media/${id}`, { method: "DELETE" });
    },
  },

  dashboard() {
    return request("/admin/dashboard");
  },

  exportAll() {
    return request("/admin/export");
  },
};
