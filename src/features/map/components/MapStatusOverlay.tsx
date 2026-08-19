import type { MapRendererStatus } from "@/features/map/ports/types";

export function MapStatusOverlay({ status }: { status: MapRendererStatus }) {
  if (status === "error") {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-24 z-10 px-4">
        <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 shadow-sm">
          <p className="font-semibold">지도를 불러올 수 없습니다.</p>
          <p>잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center px-4">
        <p className="rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-slate-600 shadow-lg shadow-slate-900/10">
          지도를 불러오는 중입니다.
        </p>
      </div>
    );
  }

  return null;
}
