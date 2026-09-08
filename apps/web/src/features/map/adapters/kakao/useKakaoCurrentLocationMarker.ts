import { useCallback, useEffect, useRef } from "react";

import type { GeoPoint } from "@/shared/geo/types";

import type { KakaoMapInstance, KakaoMarkerInstance } from "./types";

export function useKakaoCurrentLocationMarker(
  mapInstance: KakaoMapInstance | null,
) {
  const markerRef = useRef<KakaoMarkerInstance | null>(null);

  const showCurrentLocationMarker = useCallback(
    (point: GeoPoint) => {
      const kakao = window.kakao;
      if (!kakao || !mapInstance) {
        return;
      }

      const position = new kakao.maps.LatLng(
        point.latitude,
        point.longitude,
      );

      if (markerRef.current) {
        markerRef.current.setPosition(position);
        markerRef.current.setMap(mapInstance);
        return;
      }

      markerRef.current = new kakao.maps.Marker({
        map: mapInstance,
        position,
      });
    },
    [mapInstance],
  );

  useEffect(() => {
    return () => {
      markerRef.current?.setMap(null);
      markerRef.current = null;
    };
  }, []);

  return {
    showCurrentLocationMarker,
  };
}
