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
    <>
      {isExpanded ? (
        <button
          type="button"
          aria-label="바텀시트 접기"
          className="absolute inset-0 z-[5] bg-transparent"
          onClick={() => {
            setIsExpanded(false);
          }}
        />
      ) : null}
      <section
        className={`absolute inset-x-0 bottom-0 z-10 mx-auto max-w-3xl overflow-hidden rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-2xl shadow-slate-950/15 transition-[max-height] duration-200 ease-out ${isExpanded ? "max-h-[58dvh]" : "max-h-12"} ${className}`}
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
          <div className="overflow-y-auto pt-1">{children}</div>
        ) : null}
      </section>
    </>
  );
}
