import { useCallback, useRef, useState } from "react";

import type { MapViewport } from "@/features/map/domain/types";
import type {
  MapRenderer,
  MapRendererStatus,
} from "@/features/map/ports/types";
import type { GeoPoint } from "@/shared/geo/types";

import { kakaoSdkUrl } from "./kakaoLoader";
import type { KakaoMapInstance } from "./types";

export function useKakaoMapRenderer(): MapRenderer & {
  mapInstance: KakaoMapInstance | null;
  sdkUrl: string | undefined;
  onScriptReady: () => void;
  onScriptError: () => void;
} {
  const mapInstanceRef = useRef<KakaoMapInstance | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<MapViewport | null>(null);
  const [mapInstance, setMapInstance] = useState<KakaoMapInstance | null>(null);
  const [center, setCenter] = useState<GeoPoint | null>(null);
  const [status, setStatus] = useState<MapRendererStatus>(
    kakaoSdkUrl ? "loading" : "error",
  );

  const getCenterPoint = useCallback(() => {
    const mapInstance = mapInstanceRef.current;
    if (!mapInstance) {
      return null;
    }

    const center = mapInstance.getCenter();
    return {
      latitude: center.getLat(),
      longitude: center.getLng(),
    };
  }, []);

  const notifyViewportChange = useCallback(() => {
    const center = getCenterPoint();
    if (!center) {
      return;
    }

    setCenter(center);
  }, [getCenterPoint]);

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

    const nextMapInstance = new window.kakao.maps.Map(container, {
      center,
      level: viewport.zoomLevel,
    });
    window.kakao.maps.event.addListener(
      nextMapInstance,
      "dragend",
      notifyViewportChange,
    );
    mapInstanceRef.current = nextMapInstance;
    setMapInstance(nextMapInstance);
    setCenter(viewport.center);
    setStatus("ready");
  }, [notifyViewportChange]);

  const loadMapIfSdkReady = useCallback(() => {
    if (window.kakao) {
      window.kakao.maps.load(createMap);
    }
  }, [createMap]);

  const mount = useCallback(
    (container: HTMLElement, viewport: MapViewport) => {
      containerRef.current = container;
      viewportRef.current = viewport;
      loadMapIfSdkReady();
    },
    [loadMapIfSdkReady],
  );

  const moveMapToPoint = useCallback((targetPoint: GeoPoint) => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewportRef.current = { ...viewport, center: targetPoint };
    }

    if (!window.kakao || !mapInstanceRef.current) {
      return;
    }

    setCenter(targetPoint);
    mapInstanceRef.current.setCenter(
      new window.kakao.maps.LatLng(
        targetPoint.latitude,
        targetPoint.longitude,
      ),
    );
  }, []);

  const relayout = useCallback(() => {
    const mapInstance = mapInstanceRef.current;
    if (!mapInstance) {
      return;
    }

    const center = mapInstance.getCenter();
    mapInstance.relayout();
    mapInstance.setCenter(center);
  }, []);

  const onScriptReady = useCallback(() => {
    loadMapIfSdkReady();
  }, [loadMapIfSdkReady]);

  const onScriptError = useCallback(() => {
    setStatus("error");
  }, []);

  return {
    status,
    center,
    mapInstance,
    mount,
    relayout,
    moveMapToPoint,
    getCenterPoint,
    sdkUrl: kakaoSdkUrl,
    onScriptReady,
    onScriptError,
  };
}
