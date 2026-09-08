import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { KakaoCafePlace } from "../dto/search-cafes-response.dto";

const KAKAO_LOCAL_CATEGORY_SEARCH_URL =
  "https://dapi.kakao.com/v2/local/search/category.json";
const KAKAO_CAFE_CATEGORY_GROUP_CODE = "CE7";
const KAKAO_PLACE_SEARCH_PAGE_SIZE = 15;
const KAKAO_PLACE_SEARCH_MAX_PAGE_COUNT = 3;
const KAKAO_PLACE_SEARCH_RADIUS_METERS = 20000;

type SearchCafePlacesParams = {
  latitude: number;
  longitude: number;
};

type KakaoLocalCategorySearchResponse = {
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

@Injectable()
export class KakaoLocalClient {
  async searchCafePlaces({
    latitude,
    longitude,
  }: SearchCafePlacesParams): Promise<KakaoCafePlace[]> {
    const documents: KakaoLocalPlace[] = [];

    for (let page = 1; page <= KAKAO_PLACE_SEARCH_MAX_PAGE_COUNT; page += 1) {
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

  private async searchCafePlacesPage({
    latitude,
    longitude,
    page,
  }: SearchCafePlacesParams & { page: number }) {
    const restApiKey = process.env.KAKAO_REST_API_KEY;

    if (!restApiKey) {
      throw new ServiceUnavailableException("Kakao REST API key is missing");
    }

    const url = new URL(KAKAO_LOCAL_CATEGORY_SEARCH_URL);
    url.searchParams.set("category_group_code", KAKAO_CAFE_CATEGORY_GROUP_CODE);
    url.searchParams.set("x", String(longitude));
    url.searchParams.set("y", String(latitude));
    url.searchParams.set("radius", String(KAKAO_PLACE_SEARCH_RADIUS_METERS));
    url.searchParams.set("sort", "distance");
    url.searchParams.set("size", String(KAKAO_PLACE_SEARCH_PAGE_SIZE));
    url.searchParams.set("page", String(page));

    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${restApiKey}`,
      },
    });

    if (!response.ok) {
      throw new ServiceUnavailableException("Kakao Local API request failed");
    }

    return (await response.json()) as KakaoLocalCategorySearchResponse;
  }
}

function mapKakaoPlaceToCafePlace(place: KakaoLocalPlace): KakaoCafePlace {
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
