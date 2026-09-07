import { useEffect, useRef } from "react";

import type { CafePlace } from "@/features/map/domain/types";

import { createCafeMarkerImage } from "./kakaoMarkerImages";
import type { KakaoMapInstance, KakaoMarkerInstance } from "./types";

export function useKakaoCafeMarkers({
  mapInstance,
  places,
  onPlaceSelect,
}: {
  mapInstance: KakaoMapInstance | null;
  places: CafePlace[];
  onPlaceSelect?: (placeId: string) => void;
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

      const marker = new kakao.maps.Marker({
        map: mapInstance,
        position,
        image: markerImage,
      });

      if (onPlaceSelect) {
        kakao.maps.event.addListener(marker, "click", () => {
          onPlaceSelect(place.id);
        });
      }

      return marker;
    });

    markerRefs.current = markers;

    return () => {
      clearCafeMarkers(markers);
      markerRefs.current = [];
    };
  }, [mapInstance, onPlaceSelect, places]);
}

function clearCafeMarkers(markers: KakaoMarkerInstance[]) {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
}
