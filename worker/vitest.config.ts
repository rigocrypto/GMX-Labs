import { defineConfig } from "vitest/config";

// Explicit config so Vitest uses THIS directory as its root and does not walk up
// to the repository's frontend `vite.config.ts` (which pulls in `vite`, a dep
// that isn't installed in the Worker package — this broke CI when tests ran
// from `worker/`).
export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
  },
});
