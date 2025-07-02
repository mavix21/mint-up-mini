import type { Metadata } from "next";

import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_OG_IMAGE_URL,
} from "@/src/lib/constants";
import { getMiniAppEmbedMetadata } from "@/src/lib/utils";

import App from "./app";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_NAME,
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: [APP_OG_IMAGE_URL],
    },
    other: {
      "fc:frame": JSON.stringify(getMiniAppEmbedMetadata()),
    },
  };
}

export default function Home() {
  return <App />;
}
