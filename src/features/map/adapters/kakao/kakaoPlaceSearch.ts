import type { CafePlace } from "@/features/map/domain/types";
import type { GeoPoint } from "@/shared/geo/types";

import type {
  KakaoPagination,
  KakaoPlaceSearchResult,
  KakaoPlaceSearchStatus,
  KakaoSdk,
} from "./types";

export const CAFE_CATEGORY_CODE = "CE7";
const KAKAO_PLACE_SEARCH_PAGE_SIZE = 15;
const KAKAO_PLACE_SEARCH_MAX_PAGE_COUNT = 3;

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
  kakao: KakaoSdk;
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
  kakao: KakaoSdk;
  center: GeoPoint;
  categoryCode: string;
}): Promise<{
  places: KakaoPlaceSearchResult[];
  status: KakaoPlaceSearchStatus;
}> {
  const places = new kakao.maps.services.Places();

  return new Promise((resolve) => {
    const placeResults: KakaoPlaceSearchResult[] = [];

    places.categorySearch(
      categoryCode,
      (results, status, pagination) => {
        if (status !== kakao.maps.services.Status.OK) {
          resolve({ places: [], status });
          return;
        }

        placeResults.push(...results);

        if (shouldRequestNextPage(pagination)) {
          pagination.nextPage();
          return;
        }

        resolve({ places: placeResults, status });
      },
      {
        location: new kakao.maps.LatLng(center.latitude, center.longitude),
        size: KAKAO_PLACE_SEARCH_PAGE_SIZE,
        sort: kakao.maps.services.SortBy.DISTANCE,
      },
    );
  });
}

function shouldRequestNextPage(pagination: KakaoPagination) {
  return (
    pagination.hasNextPage &&
    pagination.current < KAKAO_PLACE_SEARCH_MAX_PAGE_COUNT
  );
}

function toKakaoPlaceSearchResultState({
  places,
  status,
  kakao,
}: {
  places: KakaoPlaceSearchResult[];
  status: KakaoPlaceSearchStatus;
  kakao: KakaoSdk;
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
    distanceMeters: Number(place.distance),
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
