import { useCallback, useState } from "react";

import type { CafeSearchState } from "@/features/map/ports/types";
import type { GeoPoint } from "@/shared/geo/types";

import { fetchNearbyCafes } from "./cafeSearchApi";

export function useCafeSearch() {
  const [cafeSearch, setCafeSearch] = useState<CafeSearchState>({
    status: "idle",
    places: [],
    center: null,
  });

  const searchNearbyCafes = useCallback(async (center: GeoPoint) => {
    setCafeSearch({ status: "loading", places: [], center });

    try {
      const places = await fetchNearbyCafes({ center });

      setCafeSearch({
        status: places.length > 0 ? "success" : "empty",
        places,
        center,
      });
    } catch {
      setCafeSearch({ status: "error", places: [], center });
    }
  }, []);

  return {
    cafeSearch,
    searchNearbyCafes,
  };
}
