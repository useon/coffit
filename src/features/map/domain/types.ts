import type { GeoPoint } from "@/shared/geo/types";

export type MapViewport = {
  center: GeoPoint;
  zoomLevel: number;
};

export type CafePlace = {
  id: string;
  name: string;
  distanceMeters: number;
  position: GeoPoint;
  address: string;
  roadAddress: string;
  phone: string;
  placeUrl: string;
  categoryName: string;
};
