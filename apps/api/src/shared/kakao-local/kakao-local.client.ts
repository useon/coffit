import { Injectable, ServiceUnavailableException } from "@nestjs/common";

const KAKAO_LOCAL_CATEGORY_SEARCH_URL =
  "https://dapi.kakao.com/v2/local/search/category.json";
const KAKAO_LOCAL_KEYWORD_SEARCH_URL =
  "https://dapi.kakao.com/v2/local/search/keyword.json";
const KAKAO_CAFE_CATEGORY_GROUP_CODE = "CE7";
const KAKAO_CAFE_SEARCH_PAGE_SIZE = 15;
const KAKAO_CAFE_SEARCH_MAX_PAGE_COUNT = 3;
const KAKAO_CAFE_SEARCH_RADIUS_METERS = 20000;
const KAKAO_LOCATION_SEARCH_PAGE_SIZE = 10;
const KAKAO_PROVIDER_UNAVAILABLE_MESSAGE =
  "Local search provider is unavailable";

type SearchCafePlacesParams = {
  latitude: number;
  longitude: number;
};

type KakaoLocalSearchResponse = {
  meta: {
    is_end: boolean;
  };
  documents: KakaoLocalPlace[];
};

type KakaoLocalPlace = {
  id: string;
  place_name: string;
  distance: string;
  y: string;
  x: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  place_url: string;
  category_name: string;
};

export type KakaoPlace = {
  id: string;
  name: string;
  position: {
    latitude: number;
    longitude: number;
  };
  address: string;
  roadAddress: string;
  phone: string;
  placeUrl: string;
  categoryName: string;
};

export type KakaoCafePlace = KakaoPlace & {
  distanceMeters: number;
};

@Injectable()
export class KakaoLocalClient {
  async searchCafePlaces({
    latitude,
    longitude,
  }: SearchCafePlacesParams): Promise<KakaoCafePlace[]> {
    const documents: KakaoLocalPlace[] = [];

    for (let page = 1; page <= KAKAO_CAFE_SEARCH_MAX_PAGE_COUNT; page += 1) {
      const result = await this.searchCafePlacesPage({
        latitude,
        longitude,
        page,
      });

      documents.push(...result.documents);

      if (result.meta.is_end) {
        break;
      }
    }

    return documents.map(mapKakaoPlaceToCafePlace);
  }

  async searchPlacesByKeyword(query: string): Promise<KakaoPlace[]> {
    const url = new URL(KAKAO_LOCAL_KEYWORD_SEARCH_URL);
    url.searchParams.set("query", query);
    url.searchParams.set("size", String(KAKAO_LOCATION_SEARCH_PAGE_SIZE));

    const result = await this.fetchPlaces(url);

    return result.documents.map(mapKakaoPlace);
  }

  private async searchCafePlacesPage({
    latitude,
    longitude,
    page,
  }: SearchCafePlacesParams & { page: number }) {
    const url = new URL(KAKAO_LOCAL_CATEGORY_SEARCH_URL);
    url.searchParams.set("category_group_code", KAKAO_CAFE_CATEGORY_GROUP_CODE);
    url.searchParams.set("x", String(longitude));
    url.searchParams.set("y", String(latitude));
    url.searchParams.set("radius", String(KAKAO_CAFE_SEARCH_RADIUS_METERS));
    url.searchParams.set("sort", "distance");
    url.searchParams.set("size", String(KAKAO_CAFE_SEARCH_PAGE_SIZE));
    url.searchParams.set("page", String(page));

    return this.fetchPlaces(url);
  }

  private async fetchPlaces(url: URL): Promise<KakaoLocalSearchResponse> {
    const restApiKey = process.env.KAKAO_REST_API_KEY;

    if (!restApiKey) {
      throw new ServiceUnavailableException(KAKAO_PROVIDER_UNAVAILABLE_MESSAGE);
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${restApiKey}`,
      },
    });

    if (!response.ok) {
      throw new ServiceUnavailableException(KAKAO_PROVIDER_UNAVAILABLE_MESSAGE);
    }

    return (await response.json()) as KakaoLocalSearchResponse;
  }
}

function mapKakaoPlace(place: KakaoLocalPlace): KakaoPlace {
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

function mapKakaoPlaceToCafePlace(place: KakaoLocalPlace): KakaoCafePlace {
  return {
    ...mapKakaoPlace(place),
    distanceMeters: Number(place.distance),
  };
}
