"use client";

import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
};

type Props = {
  tabs: Tab[];
  activeTab: number;
  onTabChange?: (index: number) => void;
};

export default function WizardTabs({ tabs, activeTab, onTabChange }: Props) {
  return (
    <div className="grid overflow-hidden rounded-t-md" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange?.(index)}
          className={cn(
            "text-center py-3 flex items-center justify-center text-sm font-semibold transition-colors",
            index === activeTab
              ? "bg-pink-500 text-white"
              : "bg-pink-200/50 text-gray-400"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
