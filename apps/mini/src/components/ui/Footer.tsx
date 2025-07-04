import React from "react";
import { Calendar, Home, Plus, Wallet, Zap } from "lucide-react";

import { Tab } from "@/src/lib/types";

import { BottomTab } from "./tabs/BottomTab";

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
  <div className="bg-background/95 supports-[backdrop-filter]:bg-background/80 border-border fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur">
    <div className="flex items-center justify-around p-2">
      <BottomTab
        onClick={() => setActiveTab(Tab.Home)}
        isActive={activeTab === Tab.Home}
        Icon={Home}
        label="Home"
      />
      <BottomTab
        onClick={() => setActiveTab(Tab.Actions)}
        isActive={activeTab === Tab.Actions}
        Icon={Zap}
        label="Actions"
      />
      <BottomTab
        onClick={() => setActiveTab(Tab.Create)}
        isActive={activeTab === Tab.Create}
        Icon={Plus}
        isCenter={true}
        label="Create"
      />
      <BottomTab
        onClick={() => setActiveTab(Tab.Context)}
        isActive={activeTab === Tab.Context}
        Icon={Calendar}
        label="Context"
      />
      {showWallet && (
        <BottomTab
          onClick={() => setActiveTab(Tab.Wallet)}
          isActive={activeTab === Tab.Wallet}
          Icon={Wallet}
          label="Wallet"
        />
      )}
    </div>
  </div>
);
