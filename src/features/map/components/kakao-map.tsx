"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";

const DEFAULT_CENTER = {
  latitude: 37.4979,
  longitude: 127.0276,
};

type KakaoLatLng = object;

type KakaoMapInstance = {
  setCenter: (position: KakaoLatLng) => void;
};

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level: number },
  ) => KakaoMapInstance;
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}

const sdkAppKey = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;
const sdkUrl = sdkAppKey
  ? `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${sdkAppKey}&autoload=false`
  : undefined;

export function KakaoMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<KakaoMapInstance | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    sdkUrl ? "loading" : "error",
  );

  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current || !window.kakao || mapInstanceRef.current) {
      return;
    }

    window.kakao.maps.load(() => {
      if (!mapContainerRef.current || !window.kakao || mapInstanceRef.current) {
        return;
      }

      const center = new window.kakao.maps.LatLng(
        DEFAULT_CENTER.latitude,
        DEFAULT_CENTER.longitude,
      );

      mapInstanceRef.current = new window.kakao.maps.Map(
        mapContainerRef.current,
        {
          center,
          level: 4,
        },
      );
      setStatus("ready");
    });
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-slate-100 text-slate-950">
      {sdkUrl ? (
        <Script
          src={sdkUrl}
          strategy="afterInteractive"
          onReady={initializeMap}
          onError={() => setStatus("error")}
        />
      ) : null}

      <div ref={mapContainerRef} className="absolute inset-0" />

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

      {status === "error" ? (
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 px-4">
          <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 shadow-sm">
            <p className="font-semibold">카카오맵을 불러올 수 없습니다.</p>
            <p>
              루트의 <code>.env.local</code>에
              <code className="ml-1">NEXT_PUBLIC_KAKAO_MAP_APP_KEY</code>를
              설정하고 개발 서버를 다시 시작하세요.
            </p>
          </div>
        </div>
      ) : null}

      {status === "loading" ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center px-4">
          <p className="rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-slate-600 shadow-lg shadow-slate-900/10">
            지도를 불러오는 중입니다.
          </p>
        </div>
      ) : null}
    </main>
  );
}
