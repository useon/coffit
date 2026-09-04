import type { CafePlace } from "./types";
import { LOW_COST_COFFEE_BRANDS } from "./lowCostCoffeeBrands";

export function filterLowCostCoffeeStores(places: CafePlace[]) {
  return places.filter((place) => isLowCostCoffeeStoreName(place.name));
}

function isLowCostCoffeeStoreName(storeName: string) {
  const normalizedStoreName = normalizeCoffeeStoreName(storeName);

  return LOW_COST_COFFEE_BRANDS.some((brand) =>
    brand.aliases.some((alias) =>
      normalizedStoreName.includes(normalizeCoffeeStoreName(alias)),
    ),
  );
}

function normalizeCoffeeStoreName(value: string) {
  return value.replaceAll(/\s/g, "").toLowerCase();
}
