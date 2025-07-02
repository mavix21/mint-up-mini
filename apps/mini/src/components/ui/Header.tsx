"use client";

import { useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useMiniApp } from "@neynar/react";

import { APP_NAME } from "@/src/lib/constants";

interface HeaderProps {
  neynarUser?: {
    fid: number;
    score: number;
  } | null;
}

export function Header({ neynarUser }: HeaderProps) {
  const { context } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <div className="border-primary mx-4 mt-4 mb-4 flex items-center justify-between rounded-lg border-[3px] border-double bg-gray-100 px-2 py-2 dark:bg-gray-800">
        <div className="text-lg font-light">Welcome to {APP_NAME}!</div>
        {context?.user && (
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsUserDropdownOpen(!isUserDropdownOpen);
            }}
          >
            {context.user.pfpUrl && (
              <img
                src={context.user.pfpUrl}
                alt="Profile"
                className="border-primary h-10 w-10 rounded-full border-2"
              />
            )}
          </div>
        )}
      </div>
      {context?.user && (
        <>
          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 z-50 mx-4 mt-1 w-fit rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="space-y-2 p-3">
                <div className="text-right">
                  <h3
                    className="inline-block cursor-pointer text-sm font-bold hover:underline"
                    onClick={() =>
                      sdk.actions.viewProfile({ fid: context.user.fid })
                    }
                  >
                    {context.user.displayName || context.user.username}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    @{context.user.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    FID: {context.user.fid}
                  </p>
                  {neynarUser && (
                    <>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Neynar Score: {neynarUser.score}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
