import { createClient } from "@supabase/supabase-js";

// Both values are public (anon key has no elevated privileges).
// Set them in .env.local for local builds, or as GitHub Actions Variables
// (not Secrets) for CI/CD. They are baked into the bundle at build time.
//
// IMPORTANT — before going live, configure the `gmx-lead-assets` bucket in
// the Supabase dashboard with these Storage policies so the public anon key
// can only INSERT, never list or read other users' files:
//
//   Policy: "Allow anon uploads"
//     Operation: INSERT
//     Role: anon
//     Path expression: true
//
//   Policy: "Deny anon reads and listings"
//     Operations: SELECT
//     Role: anon
//     Expression: false
//
// Also set bucket limits in the Supabase dashboard:
//   Max upload size: 10 MB  (enforced client-side too, but belt-and-suspenders)
//   Allowed MIME types: image/jpeg, image/png, image/webp, application/pdf

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[GMX Labs] Supabase env vars are not set. File uploads will be skipped. " +
      "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local."
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const STORAGE_BUCKET = "gmx-lead-assets";
