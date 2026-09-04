import { useCallback, useState } from "react";

import type { CafeSearchState } from "@/features/map/ports/types";
import type { GeoPoint } from "@/shared/geo/types";

import { searchKakaoCafesByMapCenter } from "./kakaoPlaceSearch";

export function useKakaoCafeSearch() {
  const [cafeSearch, setCafeSearch] = useState<CafeSearchState>({
    status: "idle",
    places: [],
  });

  const searchNearbyCafes = useCallback(async (center: GeoPoint) => {
    const kakao = window.kakao;
    if (!kakao) {
      return;
    }

    setCafeSearch({ status: "loading", places: [] });
    const result = await searchKakaoCafesByMapCenter({ kakao, center });
    setCafeSearch(result);
  }, []);

  return {
    cafeSearch,
    searchNearbyCafes,
  };
}
