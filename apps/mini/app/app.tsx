"use client";

import dynamic from "next/dynamic";

import { APP_NAME } from "../src/lib/constants";

// note: dynamic import is required for components that use the Frame SDK
const AppComponent = dynamic(() => import("@/src/components/App"), {
  ssr: false,
});

export default function App(
  { title }: { title?: string } = { title: APP_NAME },
) {
  return <AppComponent title={title} />;
}
