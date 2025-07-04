import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod/v4";

export const env = createEnv({
  extends: [vercel()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    // POSTGRES_URL: z.string().url(),
    NEYNAR_API_KEY: z.string(),
    NEYNAR_CLIENT_ID: z.string(),
  },

  createFinalSchema: (env) => {
    return z.object(env).transform((val) => {
      const { NEYNAR_API_KEY, NEYNAR_CLIENT_ID, NEXT_PUBLIC_URL, ...rest } =
        val;

      return {
        ...rest,
        NEXT_PUBLIC_URL,
        APP_WEBHOOK_URL:
          NEYNAR_API_KEY && NEYNAR_CLIENT_ID
            ? `https://api.neynar.com/f/app/${NEYNAR_CLIENT_ID}/event`
            : `${NEXT_PUBLIC_URL}/api/webhook`,
      };
    });
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
