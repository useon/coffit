"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type BottomSheetProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
};

export function BottomSheet({
  open,
  children,
  className = "",
}: BottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!open) {
    return null;
  }

  return (
    <section
      className={`absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-2xl shadow-slate-950/15 transition-[max-height] duration-200 ease-out ${isExpanded ? "max-h-[52dvh] sm:max-h-[48dvh] lg:max-h-[44dvh]" : "max-h-12"} ${className}`}
    >
      <button
        type="button"
        aria-label={isExpanded ? "바텀시트 접기" : "바텀시트 펼치기"}
        className="flex h-12 w-full cursor-pointer items-start justify-center pt-3 transition-colors hover:bg-slate-50 active:bg-slate-100"
        onClick={() => {
          setIsExpanded((expanded) => !expanded);
        }}
      >
        <span className="h-1 w-10 rounded-full bg-slate-300" />
      </button>
      {isExpanded ? (
        <div className="min-h-0 flex-1 overflow-y-auto pt-1">{children}</div>
      ) : null}
    </section>
  );
}
