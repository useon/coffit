import type { CafePlace } from "./types";
import {
  LOW_COST_COFFEE_BRANDS,
  LOW_COST_COFFEE_BRAND_IDS,
} from "./lowCostCoffeeBrands";
import type {
  LowCostCoffeeBrand,
  LowCostCoffeeBrandId,
} from "./lowCostCoffeeBrands";

export function filterLowCostCoffeeStores(
  places: CafePlace[],
  brandIds: LowCostCoffeeBrandId[] = [...LOW_COST_COFFEE_BRAND_IDS],
) {
  const selectedBrands = LOW_COST_COFFEE_BRANDS.filter((brand) =>
    brandIds.includes(brand.id),
  );

  return places.filter((place) =>
    isLowCostCoffeeStoreName(place.name, selectedBrands),
  );
}

function isLowCostCoffeeStoreName(
  storeName: string,
  brands: readonly LowCostCoffeeBrand[],
) {
  const normalizedStoreName = normalizeCoffeeStoreName(storeName);

  return brands.some((brand) =>
    matchesLowCostCoffeeBrandName(normalizedStoreName, brand),
  );
}

function matchesLowCostCoffeeBrandName(
  normalizedStoreName: string,
  brand: LowCostCoffeeBrand,
) {
  return brand.aliases.some((alias) =>
    normalizedStoreName.includes(normalizeCoffeeStoreName(alias)),
  );
}

function normalizeCoffeeStoreName(value: string) {
  return value.replaceAll(/\s/g, "").toLowerCase();
}
