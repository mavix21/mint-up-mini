import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getSession } from "@/auth";

import "@mint-up/ui/globals.css";

import { APP_DESCRIPTION, APP_NAME } from "@/src/lib/constants";

import { Providers } from "./providers";

export const dynamic = "force-dynamic";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
