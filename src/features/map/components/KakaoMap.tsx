"use client";

import { useEffect } from "react";
import Script from "next/script";

import { useKakaoMapRenderer } from "@/features/map/adapters/kakao/useKakaoMapRenderer";
import type { MapViewport } from "@/features/map/domain/types";
import type { MapRendererStatus } from "@/features/map/ports/types";
import { useCurrentLocation } from "@/shared/geo/useCurrentLocation";
import { Toast } from "@/shared/ui/Toast";

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
  const { moveMapToPoint } = renderer;
  const {
    point: currentLocationPoint,
    error: currentLocationError,
  } = useCurrentLocation();
  const mapNotice = getMapNotice({
    mapStatus: renderer.status,
    currentLocationError,
  });

  useEffect(() => {
    if (!currentLocationPoint) {
      return;
    }

    moveMapToPoint(currentLocationPoint);
  }, [currentLocationPoint, moveMapToPoint]);

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
      {mapNotice ? (
        <Toast
          key={mapNotice.message}
          message={mapNotice.message}
          durationMs={mapNotice.durationMs}
        />
      ) : null}

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

function getMapNotice({
  mapStatus,
  currentLocationError,
}: {
  mapStatus: MapRendererStatus;
  currentLocationError: GeolocationPositionError | null;
}) {
  if (mapStatus === "error") {
    return {
      message: "지도를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.",
      durationMs: null,
    };
  }

  if (mapStatus !== "ready") {
    return null;
  }

  if (
    currentLocationError &&
    currentLocationError.code === currentLocationError.PERMISSION_DENIED
  ) {
    return {
      message: "위치 권한이 차단되어 강남역 기준으로 표시합니다.",
      durationMs: 3000,
    };
  }

  if (currentLocationError) {
    return {
      message: "현재 위치를 가져오지 못해 강남역 기준으로 표시합니다.",
      durationMs: 3000,
    };
  }

  return null;
}
