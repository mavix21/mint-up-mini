"use client";

import ExploreEvents from "@/src/screens/ExploreEvents";

/**
 * HomeTab component displays the main landing content for the mini app.
 *
 * This is the default tab that users see when they first open the mini app.
 * It provides a simple welcome message and placeholder content that can be
 * customized for specific use cases.
 *
 * @example
 * ```tsx
 * <HomeTab />
 * ```
 */
export function ExploreTab() {
  return (
    // <div className="flex h-[calc(100vh-200px)] items-center justify-center px-6">
    //   <div className="mx-auto w-full max-w-md text-center">
    //     <p className="mb-2 text-lg">Put your content here!</p>
    //     <p className="text-sm text-gray-500">Powered by Neynar 🪐</p>
    //   </div>
    // </div>
    <ExploreEvents />
  );
}
