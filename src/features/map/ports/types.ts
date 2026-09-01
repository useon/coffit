import type { MapViewport } from "@/features/map/domain/types";
import type { GeoPoint } from "@/shared/geo/types";

export type MapRendererStatus = "loading" | "ready" | "error";

export interface MapRenderer {
  status: MapRendererStatus;
  mount: (container: HTMLElement, viewport: MapViewport) => void;
  moveMapToPoint: (targetPoint: GeoPoint) => void;
  showCurrentLocationMarker: (point: GeoPoint) => void;
}
