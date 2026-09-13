import { useCallback, useEffect, useRef } from "react";

import type { GeoPoint } from "@/shared/geo/types";

import { createCurrentLocationMarkerImage } from "./kakaoMarkerImages";
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
        image: createCurrentLocationMarkerImage({
          kakao,
          viewportWidth: window.innerWidth,
        }),
      });
    },
    [mapInstance],
  );

  useEffect(() => {
    const updateMarkerImage = () => {
      const kakao = window.kakao;
      if (!kakao || !markerRef.current) {
        return;
      }

      markerRef.current.setImage(
        createCurrentLocationMarkerImage({
          kakao,
          viewportWidth: window.innerWidth,
        }),
      );
    };

    window.addEventListener("resize", updateMarkerImage);

    return () => {
      window.removeEventListener("resize", updateMarkerImage);
      markerRef.current?.setMap(null);
      markerRef.current = null;
    };
  }, []);

  return {
    showCurrentLocationMarker,
  };
}
