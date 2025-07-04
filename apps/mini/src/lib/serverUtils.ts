import { mnemonicToAccount } from "viem/accounts";

import { env } from "../env";
import {
  APP_BUTTON_TEXT,
  APP_DESCRIPTION,
  APP_ICON_URL,
  APP_NAME,
  APP_OG_IMAGE_URL,
  APP_PRIMARY_CATEGORY,
  APP_SPLASH_BACKGROUND_COLOR,
  APP_SPLASH_URL,
  APP_TAGS,
} from "./constants";

interface MiniAppMetadata {
  version: string;
  name: string;
  iconUrl: string;
  homeUrl: string;
  imageUrl?: string;
  buttonTitle?: string;
  splashImageUrl?: string;
  splashBackgroundColor?: string;
  webhookUrl?: string;
  description?: string;
  primaryCategory?: string;
  tags?: string[];
}

interface MiniAppManifest {
  accountAssociation?: {
    header: string;
    payload: string;
    signature: string;
  };
  frame: MiniAppMetadata;
}

export function getSecretEnvVars() {
  const seedPhrase = process.env.SEED_PHRASE;
  const fid = process.env.FID;

  if (!seedPhrase || !fid) {
    return null;
  }

  return { seedPhrase, fid };
}

export async function getFarcasterMetadata(): Promise<MiniAppManifest> {
  // First check for MINI_APP_METADATA in .env and use that if it exists
  if (process.env.MINI_APP_METADATA) {
    try {
      const metadata = JSON.parse(process.env.MINI_APP_METADATA);
      console.log("Using pre-signed mini app metadata from environment");
      return metadata;
    } catch (error) {
      console.warn(
        "Failed to parse MINI_APP_METADATA from environment:",
        error,
      );
    }
  }

  // Get the domain from the URL (without https:// prefix)
  const domain = new URL(env.NEXT_PUBLIC_URL).hostname;
  console.log("Using domain for manifest:", domain);

  const secretEnvVars = getSecretEnvVars();
  if (!secretEnvVars) {
    console.warn(
      "No seed phrase or FID found in environment variables -- generating unsigned metadata",
    );
  }

  let accountAssociation;
  if (secretEnvVars) {
    // Generate account from seed phrase
    const account = mnemonicToAccount(secretEnvVars.seedPhrase);
    const custodyAddress = account.address;

    const header = {
      fid: parseInt(secretEnvVars.fid),
      type: "custody",
      key: custodyAddress,
    };
    const encodedHeader = Buffer.from(JSON.stringify(header), "utf-8").toString(
      "base64",
    );

    const payload = {
      domain,
    };
    const encodedPayload = Buffer.from(
      JSON.stringify(payload),
      "utf-8",
    ).toString("base64url");

    const signature = await account.signMessage({
      message: `${encodedHeader}.${encodedPayload}`,
    });
    const encodedSignature = Buffer.from(signature, "utf-8").toString(
      "base64url",
    );

    accountAssociation = {
      header: encodedHeader,
      payload: encodedPayload,
      signature: encodedSignature,
    };
  }

  return {
    accountAssociation,
    frame: {
      version: "1",
      name: APP_NAME,
      iconUrl: APP_ICON_URL,
      homeUrl: env.NEXT_PUBLIC_URL,
      imageUrl: APP_OG_IMAGE_URL,
      buttonTitle: APP_BUTTON_TEXT,
      splashImageUrl: APP_SPLASH_URL,
      splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
      webhookUrl: env.APP_WEBHOOK_URL,
      description: APP_DESCRIPTION,
      primaryCategory: APP_PRIMARY_CATEGORY,
      tags: APP_TAGS,
    },
  };
}
