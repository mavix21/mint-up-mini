import type { Metadata } from "next";

import { getSession } from "@/auth";

import "@mint-up/ui/globals.css";

import { APP_DESCRIPTION, APP_NAME } from "@/src/lib/constants";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
