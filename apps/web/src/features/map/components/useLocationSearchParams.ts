"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { parseSelectedLocationFromSearchParams } from "@/features/map/domain/locationSearchParams";

export function useLocationSearchParams() {
  const searchParams = useSearchParams();
  const selectedLocation = useMemo(
    () => parseSelectedLocationFromSearchParams(searchParams),
    [searchParams],
  );

  return { selectedLocation };
}
