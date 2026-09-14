"use client";

import { useEffect, useRef } from "react";

import type { MapViewport } from "@/features/map/domain/types";
import type { MapRenderer } from "@/features/map/ports/types";

export function MapView({
  renderer,
  viewport,
}: {
  renderer: MapRenderer;
  viewport: MapViewport;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { relayout } = renderer;

  useEffect(() => {
    if (containerRef.current) {
      renderer.mount(containerRef.current, viewport);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(relayout);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [relayout]);

  return (
    <div className="relative h-full min-h-0">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
