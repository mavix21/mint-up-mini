import React from "react";

import { Tab } from "@/src/lib/types";

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
  <div className="border-primary fixed right-0 bottom-0 left-0 z-50 mx-4 mb-4 rounded-lg border-[3px] border-double bg-gray-100 px-2 py-2 dark:bg-gray-800">
    <div className="flex h-14 items-center justify-around">
      <button
        onClick={() => setActiveTab(Tab.Home)}
        className={`flex h-full w-full flex-col items-center justify-center ${
          activeTab === Tab.Home
            ? "text-primary dark:text-primary-light"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <span className="text-xl">🏠</span>
        <span className="mt-1 text-xs">Home</span>
      </button>
      <button
        onClick={() => setActiveTab(Tab.Actions)}
        className={`flex h-full w-full flex-col items-center justify-center ${
          activeTab === Tab.Actions
            ? "text-primary dark:text-primary-light"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <span className="text-xl">⚡</span>
        <span className="mt-1 text-xs">Actions</span>
      </button>
      <button
        onClick={() => setActiveTab(Tab.Context)}
        className={`flex h-full w-full flex-col items-center justify-center ${
          activeTab === Tab.Context
            ? "text-primary dark:text-primary-light"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <span className="text-xl">📋</span>
        <span className="mt-1 text-xs">Context</span>
      </button>
      {showWallet && (
        <button
          onClick={() => setActiveTab(Tab.Wallet)}
          className={`flex h-full w-full flex-col items-center justify-center ${
            activeTab === Tab.Wallet
              ? "text-primary dark:text-primary-light"
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
