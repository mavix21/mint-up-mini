"use client";

import { useEffect } from "react";
import { useMiniApp } from "@neynar/react";

import { Footer } from "@/src/components/ui/Footer";
import { CreateTab, HomeTab } from "@/src/components/ui/tabs";
import { useNeynarUser } from "@/src/hooks/useNeynarUser";
import { USE_WALLET } from "@/src/lib/constants";
import { Tab } from "@/src/lib/types";

import { ExploreTab } from "./ui/tabs/ExploreTab";

/**
 * App component serves as the main container for the mini app interface.
 *
 * This component orchestrates the overall mini app experience by:
 * - Managing tab navigation and state
 * - Handling Farcaster mini app initialization
 * - Coordinating wallet and context state
 * - Providing error handling and loading states
 * - Rendering the appropriate tab content based on user selection
 *
 * The component integrates with the Neynar SDK for Farcaster functionality
 * and Wagmi for wallet management. It provides a complete mini app
 * experience with multiple tabs for different functionality areas.
 *
 * Features:
 * - Tab-based navigation (Home, Actions, Context, Wallet)
 * - Farcaster mini app integration
 * - Wallet connection management
 * - Error handling and display
 * - Loading states for async operations
 *
 * @param props - Component props
 * @param props.title - Optional title for the mini app (defaults to "Neynar Starter Kit")
 *
 * @example
 * ```tsx
 * <App title="My Mini App" />
 * ```
 */
export default function App() {
  // --- Hooks ---
  const { isSDKLoaded, context, setInitialTab, setActiveTab, currentTab } =
    useMiniApp();

  // --- Neynar user hook ---
  const { user: neynarUser } = useNeynarUser(context ?? undefined);

  // --- Effects ---
  /**
   * Sets the initial tab to "home" when the SDK is loaded.
   *
   * This effect ensures that users start on the home tab when they first
   * load the mini app. It only runs when the SDK is fully loaded to
   * prevent errors during initialization.
   */
  useEffect(() => {
    if (isSDKLoaded) {
      setInitialTab(Tab.Home);
    }
  }, [isSDKLoaded, setInitialTab]);

  // --- Early Returns ---
  if (!isSDKLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4 h-8 w-8"></div>
          <p>Loading SDK...</p>
        </div>
      </div>
    );
  }

  // --- Render ---
  return (
    <div
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      {/* Header should be full width */}
      {/* <Header neynarUser={neynarUser} /> */}

      {/* Main content and footer should be centered */}
      <div className="container mx-auto py-2 pb-20">
        {/* Tab content rendering */}
        {currentTab === Tab.Home && <HomeTab />}
        {currentTab === Tab.Create && <CreateTab />}
        {/* {currentTab === Tab.Actions && <ActionsTab />} */}
        {/* {currentTab === Tab.Context && <ContextTab />} */}
        {currentTab === Tab.Explore && <ExploreTab />}
        {/* {currentTab === Tab.Wallet && <WalletTab />} */}

        {/* Footer with navigation */}
        <Footer
          activeTab={currentTab as Tab}
          setActiveTab={setActiveTab}
          showWallet={USE_WALLET}
        />
      </div>
    </div>
  );
}
