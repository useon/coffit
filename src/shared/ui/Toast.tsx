"use client";

import { useEffect, useState } from "react";

type ToastPosition = "bottom" | "top";

type ToastProps = {
  message: string;
  position?: ToastPosition;
  durationMs?: number | null;
};

const POSITION_CLASS_NAME: Record<ToastPosition, string> = {
  bottom: "bottom-8",
  top: "top-24",
};

export function Toast({
  message,
  position = "bottom",
  durationMs = 3000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (durationMs === null) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, durationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [durationMs, message]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${POSITION_CLASS_NAME[position]} z-10 flex justify-center px-4`}
    >
      <p className="max-w-md rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm font-medium text-slate-800 shadow-lg shadow-slate-900/10 backdrop-blur">
        {message}
      </p>
    </div>
  );
}
