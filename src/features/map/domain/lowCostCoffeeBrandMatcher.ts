import type { CafePlace } from "./types";
import {
  LOW_COST_COFFEE_BRANDS,
  LOW_COST_COFFEE_BRAND_IDS,
} from "./lowCostCoffeeBrands";
import type {
  LowCostCoffeeBrand,
  LowCostCoffeeBrandId,
} from "./lowCostCoffeeBrands";

// 카페 장소명이 Coffit의 저가커피 브랜드 목록 중 하나와 매칭되는지만 판단한다.
// 검색 결과 조합이나 정렬은 cafeSearchResults.ts에서 처리한다.
export function createLowCostCoffeeBrandMatcher(
  brandIds: LowCostCoffeeBrandId[] = [...LOW_COST_COFFEE_BRAND_IDS],
) {
  const selectedBrands = LOW_COST_COFFEE_BRANDS.filter((brand) =>
    brandIds.includes(brand.id),
  );

  return (place: CafePlace) =>
    isLowCostCoffeeStoreName(place.name, selectedBrands);
}

// 매장 이름 하나가 선택된 브랜드들의 alias 중 하나를 포함하는지 확인한다.
function isLowCostCoffeeStoreName(
  storeName: string,
  brands: readonly LowCostCoffeeBrand[],
) {
  const normalizedStoreName = normalizeCoffeeStoreName(storeName);

  return brands.some((brand) =>
    matchesLowCostCoffeeBrandName(normalizedStoreName, brand),
  );
}

// 정규화된 매장 이름과 특정 브랜드의 alias 목록을 비교한다.
function matchesLowCostCoffeeBrandName(
  normalizedStoreName: string,
  brand: LowCostCoffeeBrand,
) {
  return brand.aliases.some((alias) =>
    normalizedStoreName.includes(normalizeCoffeeStoreName(alias)),
  );
}

// 공백과 대소문자 차이 때문에 같은 브랜드명이 누락되지 않도록 비교 문자열을 맞춘다.
function normalizeCoffeeStoreName(value: string) {
  return value.replaceAll(/\s/g, "").toLowerCase();
}
