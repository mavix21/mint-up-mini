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
  const [hasClickedPfp, setHasClickedPfp] = useState(false);

  return (
    <div className="relative">
      <div className="mb-1 flex items-center justify-between rounded-lg border-[3px] border-double border-purple-500 bg-gray-100 px-3 py-2 dark:bg-gray-800">
        <div className="text-lg font-light">Welcome to {APP_NAME}!</div>
        {context?.user && (
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsUserDropdownOpen(!isUserDropdownOpen);
              setHasClickedPfp(true);
            }}
          >
            {context.user.pfpUrl && (
              <img
                src={context.user.pfpUrl}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-purple-500"
              />
            )}
          </div>
        )}
      </div>
      {context?.user && (
        <>
          {!hasClickedPfp && (
            <div className="absolute right-0 -bottom-6 flex items-center justify-end gap-1 pr-2 text-xs text-purple-500">
              <span className="text-[10px]">↑</span> Click PFP!{" "}
              <span className="text-[10px]">↑</span>
            </div>
          )}

          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 z-50 mt-1 w-fit rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
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
