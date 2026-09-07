import { useCallback } from "react";

import type { CafeSearchStatus } from "@/features/map/ports/types";
import type { GeoPoint } from "@/shared/geo/types";

export function useMapAreaSearch({
  currentCenter,
  searchedCenter,
  searchStatus,
  getCenterPoint,
  searchNearbyCafes,
}: {
  currentCenter: GeoPoint | null;
  searchedCenter: GeoPoint | null;
  searchStatus: CafeSearchStatus;
  getCenterPoint: () => GeoPoint | null;
  searchNearbyCafes: (center: GeoPoint) => void;
}) {
  const searchCurrentArea = useCallback(() => {
    const center = getCenterPoint();
    if (!center) {
      return;
    }

    searchNearbyCafes(center);
  }, [getCenterPoint, searchNearbyCafes]);

  return {
    isSearchPending:
      currentCenter !== null &&
      searchedCenter !== null &&
      !isSameGeoPoint(currentCenter, searchedCenter),
    isSearching: searchStatus === "loading",
    searchCurrentArea,
  };
}

function isSameGeoPoint(pointA: GeoPoint, pointB: GeoPoint) {
  return (
    pointA.latitude === pointB.latitude &&
    pointA.longitude === pointB.longitude
  );
}
