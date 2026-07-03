import type { Env } from "./env";

// Strict, non-wildcard CORS. Only the configured GMX-Labs origin may call the
// browser-facing endpoint. The origin is reflected only on an exact match.

export function corsHeaders(env: Env, requestOrigin: string | null): Record<string, string> {
  const allowed = env.ALLOWED_ORIGIN || "https://rigocrypto.github.io";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (requestOrigin && requestOrigin === allowed) {
    headers["Access-Control-Allow-Origin"] = allowed;
  }
  return headers;
}

/** JSON response with CORS headers merged in. */
export function jsonResponse(
  data: unknown,
  status: number,
  cors: Record<string, string>
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}
