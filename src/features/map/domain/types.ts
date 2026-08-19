import type { GeoPoint } from "@/shared/geo/types";

export type MapViewport = {
  center: GeoPoint;
  zoomLevel: number;
};
