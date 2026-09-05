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
  if (!open) {
    return null;
  }

  return (
    <section
      className={`absolute inset-x-0 bottom-0 z-10 mx-auto max-h-[58dvh] max-w-3xl rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-2xl shadow-slate-950/15 ${className}`}
    >
      <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-300" />
      <div className="overflow-y-auto pt-1">{children}</div>
    </section>
  );
}
