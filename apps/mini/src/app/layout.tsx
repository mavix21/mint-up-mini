import type { Metadata } from "next";

import { getSession } from "@/auth";

import "@/src/app/globals.css";

import { Providers } from "@/src/app/providers";
import { APP_DESCRIPTION, APP_NAME } from "@/src/lib/constants";

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
