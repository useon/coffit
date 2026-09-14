import type { CafePlace, MapViewport } from "@/features/map/domain/types";
import type { GeoPoint } from "@/shared/geo/types";

export type MapRendererStatus = "loading" | "ready" | "error";
export type CafeSearchStatus = "idle" | "loading" | "success" | "empty" | "error";

export type CafeSearchState = {
  status: CafeSearchStatus;
  places: CafePlace[];
  center: GeoPoint | null;
};

export interface MapRenderer {
  status: MapRendererStatus;
  center: GeoPoint | null;
  mount: (container: HTMLElement, viewport: MapViewport) => void;
  relayout: () => void;
  moveMapToPoint: (targetPoint: GeoPoint) => void;
  getCenterPoint: () => GeoPoint | null;
}
