import { env } from "@/src/env";

export const APP_NAME = "Mint Up!";
export const APP_DESCRIPTION =
  "The web3 event platform that transforms any meetup into a collectible experience with NFT tickets and live engagement";
export const APP_PRIMARY_CATEGORY = "social";
export const APP_TAGS = "event,events,ticketing,rsvp,meetup,mint".split(",");

export const APP_URL = env.NEXT_PUBLIC_URL;
export const APP_ICON_URL = `${env.NEXT_PUBLIC_URL}/icon.png`;
export const APP_OG_IMAGE_URL = `${env.NEXT_PUBLIC_URL}/api/opengraph-image`;
export const APP_SPLASH_URL = `${env.NEXT_PUBLIC_URL}/splash.png`;
export const APP_SPLASH_BACKGROUND_COLOR = "#f7f7f7";
export const APP_BUTTON_TEXT = "Mint Your Ticket";

/**
 * Flag to enable/disable wallet functionality.
 *
 * When true, wallet-related components and features are rendered.
 * When false, wallet functionality is completely hidden from the UI.
 * Useful for mini apps that don't require wallet integration.
 */
export const USE_WALLET = true;

/**
 * Flag to enable/disable analytics tracking.
 *
 * When true, usage analytics are collected and sent to Neynar.
 * When false, analytics collection is disabled.
 * Useful for privacy-conscious users or development environments.
 */
export const ANALYTICS_ENABLED = false;
