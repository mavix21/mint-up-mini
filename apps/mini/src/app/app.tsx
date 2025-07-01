"use client";

import dynamic from "next/dynamic";

import { APP_NAME } from "@/src/lib/constants";

// note: dynamic import is required for components that use the Frame SDK
const Demo = dynamic(() => import("@/src/components/Demo"), {
  ssr: false,
});

export default function App(
  { title }: { title?: string } = { title: APP_NAME },
) {
  return <Demo title={title} />;
}
