"use client";

import { useCallback, useState } from "react";

import type { CafePlace } from "@/features/map/domain/types";

export type StoreBottomSheetMode = "list" | "detail";

export function useStoreBottomSheet(places: CafePlace[]) {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [mode, setMode] = useState<StoreBottomSheetMode>("list");
  const selectedStore =
    places.find((place) => place.id === selectedStoreId) ?? null;
  const visibleMode = selectedStore ? mode : "list";

  const selectStore = useCallback((placeId: string) => {
    setSelectedStoreId(placeId);
    setMode("detail");
  }, []);

  const showStoreList = useCallback(() => {
    setSelectedStoreId(null);
    setMode("list");
  }, []);

  return {
    mode: visibleMode,
    selectedStore,
    selectStore,
    showStoreList,
  };
}
