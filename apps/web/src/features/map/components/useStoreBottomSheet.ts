"use client";

import { useCallback, useState } from "react";

import type { CafePlace } from "@/features/map/domain/types";

export type StoreBottomSheetMode = "list" | "detail";

export function useStoreBottomSheet(places: CafePlace[]) {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [mode, setMode] = useState<StoreBottomSheetMode>("list");
  const [isExpanded, setIsExpanded] = useState(true);
  const selectedStore =
    places.find((place) => place.id === selectedStoreId) ?? null;
  const visibleMode = selectedStore ? mode : "list";

  const selectStore = useCallback((placeId: string) => {
    setSelectedStoreId(placeId);
    setMode("detail");
    setIsExpanded(true);
  }, []);

  const showStoreList = useCallback(() => {
    setSelectedStoreId(null);
    setMode("list");
    setIsExpanded(true);
  }, []);

  const changeExpanded = useCallback((expanded: boolean) => {
    setIsExpanded(expanded);
  }, []);

  return {
    isExpanded,
    mode: visibleMode,
    selectedStore,
    changeExpanded,
    selectStore,
    showStoreList,
  };
}
