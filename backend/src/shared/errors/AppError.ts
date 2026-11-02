/**
 * Error aplikasi dengan status HTTP dan kode yang stabil.
 * Semua error yang "diharapkan" (validasi, auth, not found) dilempar sebagai
 * AppError; sisanya dianggap bug dan diubah menjadi 500 oleh error handler.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    if (details !== undefined) {
      this.details = details;
    }
    Error.captureStackTrace(this, AppError);
  }

  static badRequest(message: string, details?: unknown): AppError {
    return new AppError(400, "BAD_REQUEST", message, details);
  }

  static unauthorized(message = "Anda belum terautentikasi."): AppError {
    return new AppError(401, "UNAUTHORIZED", message);
  }

  static forbidden(message = "Anda tidak punya akses ke sumber daya ini."): AppError {
    return new AppError(403, "FORBIDDEN", message);
  }

  static notFound(message = "Data tidak ditemukan."): AppError {
    return new AppError(404, "NOT_FOUND", message);
  }

  static conflict(message: string, details?: unknown): AppError {
    return new AppError(409, "CONFLICT", message, details);
  }

  static unprocessable(message: string, details?: unknown): AppError {
    return new AppError(422, "UNPROCESSABLE_ENTITY", message, details);
  }

  static tooManyRequests(message = "Terlalu banyak permintaan. Coba lagi nanti."): AppError {
    return new AppError(429, "TOO_MANY_REQUESTS", message);
  }

  static internal(message = "Terjadi kesalahan pada server."): AppError {
    return new AppError(500, "INTERNAL_SERVER_ERROR", message);
  }
}
