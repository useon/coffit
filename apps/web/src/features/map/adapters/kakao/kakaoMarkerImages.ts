import type { KakaoMarkerImageInstance, KakaoSdk } from "./types";

const CAFE_MARKER_IMAGE_URL = "/markers/coffit-cafe-marker.png";
const CAFE_MARKER_SIZE = 48;
const SELECTED_CAFE_MARKER_SIZE = 60;
const CURRENT_LOCATION_MARKER_IMAGE_URL =
  "/markers/current-location-marker.png";
const CURRENT_LOCATION_MARKER_SIZE = {
  min: 64,
  max: 84,
  viewportRatio: 0.192,
};

export function createCafeMarkerImage({
  kakao,
  selected = false,
}: {
  kakao: KakaoSdk;
  selected?: boolean;
}): KakaoMarkerImageInstance {
  const markerSize = selected ? SELECTED_CAFE_MARKER_SIZE : CAFE_MARKER_SIZE;

  return new kakao.maps.MarkerImage(
    CAFE_MARKER_IMAGE_URL,
    new kakao.maps.Size(markerSize, markerSize),
    {
      alt: selected ? "선택한 카페" : "카페",
      offset: new kakao.maps.Point(markerSize / 2, markerSize - 1),
    },
  );
}

export function createCurrentLocationMarkerImage({
  kakao,
  viewportWidth,
}: {
  kakao: KakaoSdk;
  viewportWidth: number;
}): KakaoMarkerImageInstance {
  const markerSize = getCurrentLocationMarkerSize(viewportWidth);

  return new kakao.maps.MarkerImage(
    CURRENT_LOCATION_MARKER_IMAGE_URL,
    new kakao.maps.Size(markerSize, markerSize),
    {
      alt: "현재 위치",
      offset: new kakao.maps.Point(markerSize / 2, markerSize / 2),
    },
  );
}

function getCurrentLocationMarkerSize(viewportWidth: number) {
  return Math.min(
    CURRENT_LOCATION_MARKER_SIZE.max,
    Math.max(
      CURRENT_LOCATION_MARKER_SIZE.min,
      Math.round(viewportWidth * CURRENT_LOCATION_MARKER_SIZE.viewportRatio),
    ),
  );
}
