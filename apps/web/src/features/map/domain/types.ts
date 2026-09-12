import type { GeoPoint } from "@/shared/geo/types";

import type { LowCostCoffeeBrandId } from "./lowCostCoffeeBrands";

export type MapViewport = {
  center: GeoPoint;
  zoomLevel: number;
};

export type CafePlace = {
  id: string;
  name: string;
  brandId: LowCostCoffeeBrandId;
  brandName: string;
  distanceMeters: number;
  position: GeoPoint;
  address: string;
  roadAddress: string;
  phone: string;
  placeUrl: string;
  categoryName: string;
};
