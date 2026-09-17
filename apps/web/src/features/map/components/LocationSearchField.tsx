import type { ReactNode } from "react";
import { Search } from "lucide-react";

type LocationSearchFieldProps = {
  children: ReactNode;
};

export function LocationSearchField({ children }: LocationSearchFieldProps) {
  return (
    <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
      <Search
        aria-hidden="true"
        className="mr-2 size-5 shrink-0 text-slate-400"
      />
      {children}
    </div>
  );
}
