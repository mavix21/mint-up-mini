"use client";

import { useMiniApp } from "@neynar/react";

/**
 * ContextTab component displays the current mini app context in JSON format.
 *
 * This component provides a developer-friendly view of the Farcaster mini app context,
 * including user information, client details, and other contextual data. It's useful
 * for debugging and understanding what data is available to the mini app.
 *
 * The context includes:
 * - User information (FID, username, display name, profile picture)
 * - Client information (safe area insets, platform details)
 * - Mini app configuration and state
 *
 * @example
 * ```tsx
 * <ContextTab />
 * ```
 */
export function ContextTab() {
  const { context } = useMiniApp();

  return (
    <div className="mx-6">
      <h2 className="mb-2 text-lg font-semibold">Context</h2>
      <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <pre className="w-full whitespace-pre-wrap break-words font-mono text-xs">
          {JSON.stringify(context, null, 2)}
        </pre>
      </div>
    </div>
  );
}
