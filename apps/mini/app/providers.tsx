"use client";

import type { Session } from "next-auth";
import dynamic from "next/dynamic";
import { MiniAppProvider } from "@neynar/react";
import { SessionProvider } from "next-auth/react";

import { ConvexClientProvider } from "@/src/components/providers/ConvexProvider";
import { SafeFarcasterSolanaProvider } from "@/src/components/providers/SafeFarcasterSolanaProvider";
import { ANALYTICS_ENABLED } from "@/src/lib/constants";

const WagmiProvider = dynamic(
  () => import("@/src/components/providers/WagmiProvider"),
  {
    ssr: false,
  },
);

export function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const solanaEndpoint =
    process.env.SOLANA_RPC_ENDPOINT ?? "https://solana-rpc.publicnode.com";
  return (
    <SessionProvider session={session}>
      <WagmiProvider>
        <MiniAppProvider
          analyticsEnabled={ANALYTICS_ENABLED}
          backButtonEnabled={true}
        >
          <SafeFarcasterSolanaProvider endpoint={solanaEndpoint}>
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </SafeFarcasterSolanaProvider>
        </MiniAppProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
