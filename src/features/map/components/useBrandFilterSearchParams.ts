"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  createSearchParamsWithBrandIds,
  parseBrandIdsFromSearchParams,
} from "@/features/map/domain/brandFilterSearchParams";
import type { LowCostCoffeeBrandId } from "@/features/map/domain/lowCostCoffeeBrands";

export function useBrandFilterSearchParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBrandIds = useMemo(
    () => parseBrandIdsFromSearchParams(searchParams),
    [searchParams],
  );

  const changeSelectedBrandIds = useCallback(
    (brandIds: LowCostCoffeeBrandId[]) => {
      const nextSearchParams = createSearchParamsWithBrandIds({
        searchParams,
        brandIds,
      });
      const queryString = nextSearchParams.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return {
    selectedBrandIds,
    changeSelectedBrandIds,
  };
}
