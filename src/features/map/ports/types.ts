import type { CafePlace, MapViewport } from "@/features/map/domain/types";
import type { GeoPoint } from "@/shared/geo/types";

export type MapRendererStatus = "loading" | "ready" | "error";
export type CafeSearchStatus = "idle" | "loading" | "success" | "empty" | "error";

export type CafeSearchState = {
  status: CafeSearchStatus;
  places: CafePlace[];
};

export interface MapRenderer {
  status: MapRendererStatus;
  mount: (container: HTMLElement, viewport: MapViewport) => void;
  moveMapToPoint: (targetPoint: GeoPoint) => void;
}
