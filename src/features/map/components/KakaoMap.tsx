"use client";

import Script from "next/script";

import { useKakaoMapRenderer } from "@/features/map/adapters/kakao/useKakaoMapRenderer";
import type { MapViewport } from "@/features/map/domain/types";

import { MapView } from "./MapView";

const DEFAULT_VIEWPORT: MapViewport = {
  center: {
    latitude: 37.4979,
    longitude: 127.0276,
  },
  zoomLevel: 4,
};

export function KakaoMap() {
  const renderer = useKakaoMapRenderer();

  return (
    <main className="relative min-h-dvh overflow-hidden bg-slate-100 text-slate-950">
      {renderer.sdkUrl ? (
        <Script
          src={renderer.sdkUrl}
          strategy="afterInteractive"
          onReady={renderer.onScriptReady}
          onError={renderer.onScriptError}
        />
      ) : null}

      <MapView renderer={renderer} viewport={DEFAULT_VIEWPORT} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-4 sm:p-6">
        <div className="pointer-events-auto mx-auto max-w-3xl">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur">
            <span className="text-lg font-bold tracking-normal text-emerald-700">
              Coffit
            </span>
            <div className="h-5 w-px bg-slate-200" />
            <p className="truncate text-sm font-medium text-slate-700">
              주변 저가 프랜차이즈 카페
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
