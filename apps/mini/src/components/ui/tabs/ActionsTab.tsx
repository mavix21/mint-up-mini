"use client";

import type { Haptics } from "@farcaster/frame-sdk";
import { useCallback, useState } from "react";
import { useMiniApp } from "@neynar/react";

import { Button } from "@mint-up/ui/components/button";

import { ShareButton } from "../Share";
import { SignIn } from "../wallet/SignIn";

/**
 * ActionsTab component handles mini app actions like sharing, notifications, and haptic feedback.
 *
 * This component provides the main interaction interface for users to:
 * - Share the mini app with others
 * - Sign in with Farcaster
 * - Send notifications to their account
 * - Trigger haptic feedback
 * - Add the mini app to their client
 * - Copy share URLs
 *
 * The component uses the useMiniApp hook to access Farcaster context and actions.
 * All state is managed locally within this component.
 *
 * @example
 * ```tsx
 * <ActionsTab />
 * ```
 */
export function ActionsTab() {
  // --- Hooks ---
  const { actions, added, notificationDetails, haptics, context } =
    useMiniApp();

  // --- State ---
  const [notificationState, setNotificationState] = useState({
    sendStatus: "",
    shareUrlCopied: false,
  });
  const [selectedHapticIntensity, setSelectedHapticIntensity] =
    useState<Haptics.ImpactOccurredType>("medium");

  // --- Handlers ---
  /**
   * Sends a notification to the current user's Farcaster account.
   *
   * This function makes a POST request to the /api/send-notification endpoint
   * with the user's FID and notification details. It handles different response
   * statuses including success (200), rate limiting (429), and errors.
   *
   * @returns Promise that resolves when the notification is sent or fails
   */
  const sendFarcasterNotification = useCallback(async () => {
    setNotificationState((prev) => ({ ...prev, sendStatus: "" }));
    if (!notificationDetails || !context) {
      return;
    }
    try {
      const response = await fetch("/api/send-notification", {
        method: "POST",
        mode: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fid: context.user.fid,
          notificationDetails,
        }),
      });
      if (response.status === 200) {
        setNotificationState((prev) => ({ ...prev, sendStatus: "Success" }));
        return;
      } else if (response.status === 429) {
        setNotificationState((prev) => ({
          ...prev,
          sendStatus: "Rate limited",
        }));
        return;
      }
      const responseText = await response.text();
      setNotificationState((prev) => ({
        ...prev,
        sendStatus: `Error: ${responseText}`,
      }));
    } catch (error) {
      setNotificationState((prev) => ({
        ...prev,
        sendStatus: `Error: ${error}`,
      }));
    }
  }, [context, notificationDetails]);

  /**
   * Copies the share URL for the current user to the clipboard.
   *
   * This function generates a share URL using the user's FID and copies it
   * to the clipboard. It shows a temporary "Copied!" message for 2 seconds.
   */
  const copyUserShareUrl = useCallback(async () => {
    if (context?.user?.fid) {
      const userShareUrl = `${process.env.NEXT_PUBLIC_URL}/share/${context.user.fid}`;
      await navigator.clipboard.writeText(userShareUrl);
      setNotificationState((prev) => ({ ...prev, shareUrlCopied: true }));
      setTimeout(
        () =>
          setNotificationState((prev) => ({ ...prev, shareUrlCopied: false })),
        2000,
      );
    }
  }, [context?.user?.fid]);

  /**
   * Triggers haptic feedback with the selected intensity.
   *
   * This function calls the haptics.impactOccurred method with the current
   * selectedHapticIntensity setting. It handles errors gracefully by logging them.
   */
  const triggerHapticFeedback = useCallback(async () => {
    try {
      await haptics.impactOccurred(selectedHapticIntensity);
    } catch (error) {
      console.error("Haptic feedback failed:", error);
    }
  }, [haptics, selectedHapticIntensity]);

  // --- Render ---
  return (
    <div className="mx-auto w-full max-w-md space-y-3 px-6">
      {/* Share functionality */}
      <ShareButton
        buttonText="Share Mini App"
        cast={{
          text: "Check out this awesome frame @1 @2 @3! 🚀🪐",
          bestFriends: true,
          embeds: [
            `${process.env.NEXT_PUBLIC_URL}/share/${context?.user?.fid || ""}`,
          ],
        }}
        className="w-full"
      />

      {/* Authentication */}
      <SignIn />

      {/* Mini app actions */}
      <Button
        onClick={() =>
          actions.openUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        }
        className="w-full"
      >
        Open Link
      </Button>

      <Button onClick={actions.addMiniApp} disabled={added} className="w-full">
        Add Mini App to Client
      </Button>

      {/* Notification functionality */}
      {notificationState.sendStatus && (
        <div className="w-full text-sm">
          Send notification result: {notificationState.sendStatus}
        </div>
      )}
      <Button
        onClick={sendFarcasterNotification}
        disabled={!notificationDetails}
        className="w-full"
      >
        Send notification
      </Button>

      {/* Share URL copying */}
      <Button
        onClick={copyUserShareUrl}
        disabled={!context?.user?.fid}
        className="w-full"
      >
        {notificationState.shareUrlCopied ? "Copied!" : "Copy share URL"}
      </Button>

      {/* Haptic feedback controls */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Haptic Intensity
        </label>
        <select
          value={selectedHapticIntensity}
          onChange={(e) =>
            setSelectedHapticIntensity(
              e.target.value as Haptics.ImpactOccurredType,
            )
          }
          className="focus:ring-primary w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value={"light"}>Light</option>
          <option value={"medium"}>Medium</option>
          <option value={"heavy"}>Heavy</option>
          <option value={"soft"}>Soft</option>
          <option value={"rigid"}>Rigid</option>
        </select>
        <Button onClick={triggerHapticFeedback} className="w-full">
          Trigger Haptic Feedback
        </Button>
      </div>
    </div>
  );
}
