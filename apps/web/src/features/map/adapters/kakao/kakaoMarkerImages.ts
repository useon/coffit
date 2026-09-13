import type { KakaoMarkerImageInstance, KakaoSdk } from "./types";

const CAFE_MARKER_IMAGE_URL = "/markers/coffit-cafe-marker.png";
const CURRENT_LOCATION_MARKER_IMAGE_URL =
  "/markers/current-location-marker.png";
const CURRENT_LOCATION_MARKER_SIZE = {
  min: 64,
  max: 84,
  viewportRatio: 0.192,
};

export function createCafeMarkerImage({
  kakao,
}: {
  kakao: KakaoSdk;
}): KakaoMarkerImageInstance {
  return new kakao.maps.MarkerImage(
    CAFE_MARKER_IMAGE_URL,
    new kakao.maps.Size(48, 48),
    {
      alt: "카페",
      offset: new kakao.maps.Point(24, 47),
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
