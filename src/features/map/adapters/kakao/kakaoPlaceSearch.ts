import type { CafePlace } from "@/features/map/domain/types";
import type { GeoPoint } from "@/shared/geo/types";

import type { KakaoPlaceSearchResult, KakaoPlaceSearchStatus } from "./types";

export const CAFE_CATEGORY_CODE = "CE7";

export type KakaoPlaceSearchSuccess = {
  status: "success";
  places: CafePlace[];
};

export type KakaoPlaceSearchEmpty = {
  status: "empty";
  places: [];
};

export type KakaoPlaceSearchFailure = {
  status: "error";
  places: [];
};

export type KakaoPlaceSearchResultState =
  KakaoPlaceSearchSuccess | KakaoPlaceSearchEmpty | KakaoPlaceSearchFailure;

export async function searchKakaoCafesByMapCenter({
  kakao,
  center,
}: {
  kakao: NonNullable<Window["kakao"]>;
  center: GeoPoint;
}): Promise<KakaoPlaceSearchResultState> {
  const result = await searchKakaoCategoryPlaces({
    kakao,
    center,
    categoryCode: CAFE_CATEGORY_CODE,
  });

  return toKakaoPlaceSearchResultState({ ...result, kakao });
}

function searchKakaoCategoryPlaces({
  kakao,
  center,
  categoryCode,
}: {
  kakao: NonNullable<Window["kakao"]>;
  center: GeoPoint;
  categoryCode: string;
}): Promise<{
  places: KakaoPlaceSearchResult[];
  status: KakaoPlaceSearchStatus;
}> {
  const places = new kakao.maps.services.Places();

  return new Promise((resolve) => {
    places.categorySearch(
      categoryCode,
      (results, status) => {
        resolve({ places: results, status });
      },
      {
        location: new kakao.maps.LatLng(center.latitude, center.longitude),
      },
    );
  });
}

function toKakaoPlaceSearchResultState({
  places,
  status,
  kakao,
}: {
  places: KakaoPlaceSearchResult[];
  status: KakaoPlaceSearchStatus;
  kakao: NonNullable<Window["kakao"]>;
}): KakaoPlaceSearchResultState {
  if (status === kakao.maps.services.Status.OK) {
    return {
      status: "success",
      places: places.map(mapKakaoPlaceToCafePlace),
    };
  }

  if (status === kakao.maps.services.Status.ZERO_RESULT) {
    return {
      status: "empty",
      places: [],
    };
  }

  return {
    status: "error",
    places: [],
  };
}

function mapKakaoPlaceToCafePlace(place: KakaoPlaceSearchResult): CafePlace {
  return {
    id: place.id,
    name: place.place_name,
    position: {
      latitude: Number(place.y),
      longitude: Number(place.x),
    },
    address: place.address_name,
    roadAddress: place.road_address_name,
    phone: place.phone,
    placeUrl: place.place_url,
    categoryName: place.category_name,
  };
}
