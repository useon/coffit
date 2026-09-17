import { Injectable } from "@nestjs/common";
import {
  KakaoCafePlace,
  KakaoLocalClient,
} from "../shared/kakao-local/kakao-local.client";
import { SearchCafesQueryDto } from "./dto/search-cafes-query.dto";
import {
  CafePlaceDto,
  SearchCafesResponseDto,
} from "./dto/search-cafes-response.dto";
import { findLowCostCoffeeBrand } from "./domain/low-cost-coffee-brands";

@Injectable()
export class CafesService {
  constructor(private readonly kakaoLocalClient: KakaoLocalClient) {}

  async searchCafes(
    query: SearchCafesQueryDto,
  ): Promise<SearchCafesResponseDto> {
    const places = await this.kakaoLocalClient.searchCafePlaces({
      latitude: query.lat,
      longitude: query.lng,
    });

    return {
      places: places
        .map(toLowCostCoffeeCafePlace)
        .filter((place): place is CafePlaceDto => place !== null)
        .sort(compareCafeDistance),
    };
  }
}

function toLowCostCoffeeCafePlace(place: KakaoCafePlace): CafePlaceDto | null {
  const brand = findLowCostCoffeeBrand(place.name);

  if (!brand) {
    return null;
  }

  return {
    ...place,
    brandId: brand.id,
    brandName: brand.name,
  };
}

function compareCafeDistance(
  previousPlace: CafePlaceDto,
  nextPlace: CafePlaceDto,
) {
  return previousPlace.distanceMeters - nextPlace.distanceMeters;
}
