import { createLowCostCoffeeBrandMatcher } from "./lowCostCoffeeBrandMatcher";
import type { LowCostCoffeeBrandId } from "./lowCostCoffeeBrands";
import type { CafePlace } from "./types";

// 카페 장소 목록에 현재 검색 조건과 정렬 규칙을 적용해 지도와 리스트에 넘길 결과를 만든다.
export type CafeSearchFilters = {
  brandIds: LowCostCoffeeBrandId[];
};

export function getFilteredCafePlaces({
  places,
  filters,
}: {
  places: CafePlace[];
  filters: CafeSearchFilters;
}) {
  const matchesSelectedBrand = createLowCostCoffeeBrandMatcher(
    filters.brandIds,
  );

  return places
    .filter(matchesSelectedBrand)
    .sort(compareCafePlaceDistance);
}

// 장소의 거리 값을 기준으로 가까운 카페가 먼저 오도록 정렬한다.
function compareCafePlaceDistance(
  previousPlace: CafePlace,
  nextPlace: CafePlace,
) {
  return previousPlace.distanceMeters - nextPlace.distanceMeters;
}
