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
        NEYNAR_API_KEY,
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
    NEXT_PUBLIC_CONVEX_URL: z.string(),
    NEXT_PUBLIC_MINI_APP_NAME: z.string(),
    NEXT_PUBLIC_MINI_APP_BUTTON_TEXT: z.string(),
    NEXT_PUBLIC_MINI_APP_DESCRIPTION: z.string(),
    NEXT_PUBLIC_MINI_APP_PRIMARY_CATEGORY: z.string(),
    NEXT_PUBLIC_MINI_APP_TAGS: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_MINI_APP_NAME: process.env.NEXT_PUBLIC_MINI_APP_NAME,
    NEXT_PUBLIC_MINI_APP_BUTTON_TEXT:
      process.env.NEXT_PUBLIC_MINI_APP_BUTTON_TEXT,
    NEXT_PUBLIC_MINI_APP_DESCRIPTION:
      process.env.NEXT_PUBLIC_MINI_APP_DESCRIPTION,
    NEXT_PUBLIC_MINI_APP_PRIMARY_CATEGORY:
      process.env.NEXT_PUBLIC_MINI_APP_PRIMARY_CATEGORY,
    NEXT_PUBLIC_MINI_APP_TAGS: process.env.NEXT_PUBLIC_MINI_APP_TAGS,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
