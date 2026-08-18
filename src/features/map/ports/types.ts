import type { MapViewport } from "@/features/map/domain/types";

export type MapRendererStatus = "loading" | "ready" | "error";

export interface MapRenderer {
  status: MapRendererStatus;
  mount: (container: HTMLElement, viewport: MapViewport) => void;
}
