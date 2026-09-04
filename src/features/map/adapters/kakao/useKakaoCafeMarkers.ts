import { useEffect, useRef } from "react";

import type { CafePlace } from "@/features/map/domain/types";

import { createCafeMarkerImage } from "./kakaoMarkerImages";
import type { KakaoMapInstance, KakaoMarkerInstance } from "./types";

export function useKakaoCafeMarkers({
  mapInstance,
  places,
}: {
  mapInstance: KakaoMapInstance | null;
  places: CafePlace[];
}) {
  const markerRefs = useRef<KakaoMarkerInstance[]>([]);

  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao || !mapInstance) {
      return;
    }

    const markerImage = createCafeMarkerImage({ kakao });
    const markers = places.map((place) => {
      const position = new kakao.maps.LatLng(
        place.position.latitude,
        place.position.longitude,
      );

      return new kakao.maps.Marker({
        map: mapInstance,
        position,
        image: markerImage,
      });
    });

    markerRefs.current = markers;

    return () => {
      clearCafeMarkers(markers);
      markerRefs.current = [];
    };
  }, [mapInstance, places]);
}

function clearCafeMarkers(markers: KakaoMarkerInstance[]) {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
}
