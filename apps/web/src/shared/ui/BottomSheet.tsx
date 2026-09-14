"use client";

import type { ReactNode } from "react";

type BottomSheetProps = {
  open: boolean;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  children: ReactNode;
  className?: string;
};

export function BottomSheet({
  open,
  expanded,
  onExpandedChange,
  children,
  className = "",
}: BottomSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <section
      className={`z-10 mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-2xl shadow-slate-950/15 transition-[max-height] duration-200 ease-out ${expanded ? "max-h-[60dvh] sm:max-h-[48dvh] lg:max-h-[44dvh]" : "max-h-12"} ${className}`}
    >
      <button
        type="button"
        aria-label={expanded ? "바텀시트 접기" : "바텀시트 펼치기"}
        className="flex h-12 w-full cursor-pointer items-start justify-center pt-3 transition-colors hover:bg-slate-50 active:bg-slate-100"
        onClick={() => {
          onExpandedChange(!expanded);
        }}
      >
        <span className="h-1 w-10 rounded-full bg-slate-300" />
      </button>
      {expanded ? (
        <div className="min-h-0 flex-1 overflow-y-auto pt-1">{children}</div>
      ) : null}
    </section>
  );
}
