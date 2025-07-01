import React from "react";

import type { Tab } from "@/src/lib/types";

interface FooterProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  showWallet?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  activeTab,
  setActiveTab,
  showWallet = false,
}) => (
  <div className="fixed right-0 bottom-0 left-0 z-50 mx-4 mb-4 rounded-lg border-[3px] border-double border-purple-500 bg-gray-100 px-2 py-2 dark:bg-gray-800">
    <div className="flex h-14 items-center justify-around">
      <button
        onClick={() => setActiveTab("home")}
        className={`flex h-full w-full flex-col items-center justify-center ${
          activeTab === "home"
            ? "text-purple-500 dark:text-purple-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <span className="text-xl">🏠</span>
        <span className="mt-1 text-xs">Home</span>
      </button>
      <button
        onClick={() => setActiveTab("actions")}
        className={`flex h-full w-full flex-col items-center justify-center ${
          activeTab === "actions"
            ? "text-purple-500 dark:text-purple-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <span className="text-xl">⚡</span>
        <span className="mt-1 text-xs">Actions</span>
      </button>
      <button
        onClick={() => setActiveTab("context")}
        className={`flex h-full w-full flex-col items-center justify-center ${
          activeTab === "context"
            ? "text-purple-500 dark:text-purple-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <span className="text-xl">📋</span>
        <span className="mt-1 text-xs">Context</span>
      </button>
      {showWallet && (
        <button
          onClick={() => setActiveTab("wallet")}
          className={`flex h-full w-full flex-col items-center justify-center ${
            activeTab === "wallet"
              ? "text-purple-500 dark:text-purple-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <span className="text-xl">👛</span>
          <span className="mt-1 text-xs">Wallet</span>
        </button>
      )}
    </div>
  </div>
);
