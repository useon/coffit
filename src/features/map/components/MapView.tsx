"use client";

import { useEffect, useRef } from "react";

import type { MapViewport } from "@/features/map/domain/types";
import type { MapRenderer } from "@/features/map/ports/map-renderer";

import { MapStatusOverlay } from "./MapStatusOverlay";

export function MapView({
  renderer,
  viewport,
}: {
  renderer: MapRenderer;
  viewport: MapViewport;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      renderer.mount(containerRef.current, viewport);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0" />
      <MapStatusOverlay status={renderer.status} />
    </div>
  );
}
