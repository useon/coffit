import { useCallback, useRef, useState } from "react";

import type { MapViewport } from "@/features/map/domain/types";
import type {
  MapRenderer,
  MapRendererStatus,
} from "@/features/map/ports/map-renderer";

import { kakaoSdkUrl } from "./kakaoLoader";
import type { KakaoMapInstance } from "./kakaoMap.types";

export function useKakaoMapRenderer(): MapRenderer & {
  sdkUrl: string | undefined;
  onScriptReady: () => void;
  onScriptError: () => void;
} {
  const mapInstanceRef = useRef<KakaoMapInstance | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<MapViewport | null>(null);
  const [status, setStatus] = useState<MapRendererStatus>(
    kakaoSdkUrl ? "loading" : "error",
  );

  const createMap = useCallback(() => {
    const container = containerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport || !window.kakao || mapInstanceRef.current) {
      return;
    }

    const center = new window.kakao.maps.LatLng(
      viewport.center.latitude,
      viewport.center.longitude,
    );

    mapInstanceRef.current = new window.kakao.maps.Map(container, {
      center,
      level: viewport.zoomLevel,
    });
    setStatus("ready");
  }, []);

  const mount = useCallback(
    (container: HTMLElement, viewport: MapViewport) => {
      containerRef.current = container;
      viewportRef.current = viewport;

      if (window.kakao) {
        window.kakao.maps.load(createMap);
      }
    },
    [createMap],
  );

  const onScriptReady = useCallback(() => {
    if (!window.kakao) return;
    window.kakao.maps.load(createMap);
  }, [createMap]);

  const onScriptError = useCallback(() => {
    setStatus("error");
  }, []);

  return { status, mount, sdkUrl: kakaoSdkUrl, onScriptReady, onScriptError };
}
