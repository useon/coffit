import { useEffect, useRef } from "react";

import type { CafePlace } from "@/features/map/domain/types";

import { createCafeMarkerImage } from "./kakaoMarkerImages";
import type {
  KakaoCustomOverlayInstance,
  KakaoMapInstance,
  KakaoMarkerInstance,
} from "./types";

const CAFE_LABEL_VISIBLE_MAX_LEVEL = 3;

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
    const labels = places.map((place) => {
      const position = new kakao.maps.LatLng(
        place.position.latitude,
        place.position.longitude,
      );

      return new kakao.maps.CustomOverlay({
        position,
        content: createCafeLabel(place.name),
        xAnchor: 0.5,
        yAnchor: 0,
      });
    });
    const updateLabelVisibility = () => {
      const shouldShowLabels =
        mapInstance.getLevel() <= CAFE_LABEL_VISIBLE_MAX_LEVEL;

      labels.forEach((label) => {
        label.setMap(shouldShowLabels ? mapInstance : null);
      });
    };

    updateLabelVisibility();
    kakao.maps.event.addListener(
      mapInstance,
      "zoom_changed",
      updateLabelVisibility,
    );

    markerRefs.current = markers;

    return () => {
      kakao.maps.event.removeListener(
        mapInstance,
        "zoom_changed",
        updateLabelVisibility,
      );
      clearCafeMarkers(markers);
      clearCafeLabels(labels);
      markerRefs.current = [];
    };
  }, [mapInstance, onPlaceSelect, places]);
}

function clearCafeMarkers(markers: KakaoMarkerInstance[]) {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
}

function clearCafeLabels(labels: KakaoCustomOverlayInstance[]) {
  labels.forEach((label) => {
    label.setMap(null);
  });
}

function createCafeLabel(name: string) {
  const label = document.createElement("span");

  label.className =
    "pointer-events-none mt-1 block max-w-32 truncate rounded-full border border-slate-200 bg-white/95 px-2 py-1 text-xs font-bold text-slate-800 shadow-sm shadow-slate-900/10";
  label.textContent = name;

  return label;
}
