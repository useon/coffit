import { LOW_COST_COFFEE_BRAND_IDS } from "./lowCostCoffeeBrands";
import type { LowCostCoffeeBrandId } from "./lowCostCoffeeBrands";

const BRAND_FILTER_SEARCH_PARAM = "brands";

type BrandFilterSearchParams = {
  get: (name: string) => string | null;
  has: (name: string) => boolean;
  toString: () => string;
};

export function parseBrandIdsFromSearchParams(
  searchParams: BrandFilterSearchParams,
) {
  if (!searchParams.has(BRAND_FILTER_SEARCH_PARAM)) {
    return [...LOW_COST_COFFEE_BRAND_IDS];
  }

  const value = searchParams.get(BRAND_FILTER_SEARCH_PARAM);

  if (!value) {
    return [];
  }

  const brandIds = value.split(",").filter(isLowCostCoffeeBrandId);

  if (brandIds.length === 0) {
    return [...LOW_COST_COFFEE_BRAND_IDS];
  }

  return LOW_COST_COFFEE_BRAND_IDS.filter((brandId) =>
    brandIds.includes(brandId),
  );
}

export function createSearchParamsWithBrandIds({
  searchParams,
  brandIds,
}: {
  searchParams: BrandFilterSearchParams;
  brandIds: LowCostCoffeeBrandId[];
}) {
  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const orderedBrandIds = LOW_COST_COFFEE_BRAND_IDS.filter((brandId) =>
    brandIds.includes(brandId),
  );

  if (orderedBrandIds.length === LOW_COST_COFFEE_BRAND_IDS.length) {
    nextSearchParams.delete(BRAND_FILTER_SEARCH_PARAM);
  } else {
    nextSearchParams.set(BRAND_FILTER_SEARCH_PARAM, orderedBrandIds.join(","));
  }

  return nextSearchParams;
}

function isLowCostCoffeeBrandId(value: string): value is LowCostCoffeeBrandId {
  return LOW_COST_COFFEE_BRAND_IDS.includes(value as LowCostCoffeeBrandId);
}
