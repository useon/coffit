import { Injectable } from "@nestjs/common";
import {
  KakaoLocalClient,
  KakaoPlace,
} from "../shared/kakao-local/kakao-local.client";
import { SearchLocationsQueryDto } from "./dto/search-locations-query.dto";
import {
  LocationCandidateDto,
  SearchLocationsResponseDto,
} from "./dto/search-locations-response.dto";

@Injectable()
export class LocationsService {
  constructor(private readonly kakaoLocalClient: KakaoLocalClient) {}

  async searchLocations(
    query: SearchLocationsQueryDto,
  ): Promise<SearchLocationsResponseDto> {
    const locations = await this.kakaoLocalClient.searchPlacesByKeyword(
      query.query,
    );

    return {
      locations: locations.map(toLocationCandidate),
    };
  }
}

function toLocationCandidate(place: KakaoPlace): LocationCandidateDto {
  return {
    id: place.id,
    name: place.name,
    position: place.position,
    address: place.address,
    roadAddress: place.roadAddress,
    categoryName: place.categoryName,
  };
}
