import type { KakaoMarkerImageInstance } from "./types";

const CAFE_MARKER_IMAGE_URL =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png";

export function createCafeMarkerImage({
  kakao,
}: {
  kakao: NonNullable<Window["kakao"]>;
}): KakaoMarkerImageInstance {
  return new kakao.maps.MarkerImage(
    CAFE_MARKER_IMAGE_URL,
    new kakao.maps.Size(22, 26),
    {
      alt: "카페",
      spriteOrigin: new kakao.maps.Point(10, 0),
      spriteSize: new kakao.maps.Size(36, 98),
    },
  );
}
