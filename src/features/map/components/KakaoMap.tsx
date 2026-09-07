"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Script from "next/script";

import { useKakaoCafeMarkers } from "@/features/map/adapters/kakao/useKakaoCafeMarkers";
import { useKakaoCafeSearch } from "@/features/map/adapters/kakao/useKakaoCafeSearch";
import { useKakaoCurrentLocationMarker } from "@/features/map/adapters/kakao/useKakaoCurrentLocationMarker";
import { useKakaoMapRenderer } from "@/features/map/adapters/kakao/useKakaoMapRenderer";
import { getFilteredCafePlaces } from "@/features/map/domain/cafeSearchResults";
import { LOW_COST_COFFEE_BRANDS } from "@/features/map/domain/lowCostCoffeeBrands";
import type { LowCostCoffeeBrandId } from "@/features/map/domain/lowCostCoffeeBrands";
import type { MapViewport } from "@/features/map/domain/types";
import type { MapRendererStatus } from "@/features/map/ports/types";
import type { GeoPoint } from "@/shared/geo/types";
import { useCurrentLocation } from "@/shared/geo/useCurrentLocation";
import { BottomSheet } from "@/shared/ui/BottomSheet";
import { Chips } from "@/shared/ui/Chips";
import { Toast } from "@/shared/ui/Toast";

import { CafeSearchResultList } from "./CafeSearchResultList";
import { CafeStoreDetail } from "./CafeStoreDetail";
import { MapView } from "./MapView";
import { useBrandFilterSearchParams } from "./useBrandFilterSearchParams";
import { useStoreBottomSheet } from "./useStoreBottomSheet";

const DEFAULT_VIEWPORT: MapViewport = {
  center: {
    latitude: 37.4979,
    longitude: 127.0276,
  },
  zoomLevel: 4,
};

export function KakaoMap() {
  const hasSearchedInitialAreaRef = useRef(false);
  const renderer = useKakaoMapRenderer();
  const {
    selectedBrandIds,
    changeSelectedBrandIds,
  } = useBrandFilterSearchParams();
  const { cafeSearch, searchNearbyCafes } = useKakaoCafeSearch();
  const filteredCafePlaces = useMemo(
    () =>
      getFilteredCafePlaces({
        places: cafeSearch.places,
        filters: {
          brandIds: selectedBrandIds,
        },
      }),
    [cafeSearch.places, selectedBrandIds],
  );
  const storeBottomSheet = useStoreBottomSheet(filteredCafePlaces);
  const { showStoreList } = storeBottomSheet;
  const changeBrandFilter = useCallback(
    (brandIds: LowCostCoffeeBrandId[]) => {
      showStoreList();
      changeSelectedBrandIds(brandIds);
    },
    [changeSelectedBrandIds, showStoreList],
  );
  const { showCurrentLocationMarker } = useKakaoCurrentLocationMarker(
    renderer.mapInstance,
  );
  const { moveMapToPoint } = renderer;
  const focusCurrentLocation = useCallback(
    (point: GeoPoint) => {
      moveMapToPoint(point);
      showCurrentLocationMarker(point);
    },
    [moveMapToPoint, showCurrentLocationMarker],
  );
  useKakaoCafeMarkers({
    mapInstance: renderer.mapInstance,
    places: filteredCafePlaces,
    onPlaceSelect: storeBottomSheet.selectStore,
  });
  const {
    isLoading: isCurrentLocationLoading,
    point: currentLocationPoint,
    error: currentLocationError,
  } = useCurrentLocation();
  const mapNotice = getMapNotice({
    mapStatus: renderer.status,
    currentLocationError,
  });
  useEffect(() => {
    if (
      renderer.status !== "ready" ||
      isCurrentLocationLoading ||
      hasSearchedInitialAreaRef.current
    ) {
      return;
    }

    hasSearchedInitialAreaRef.current = true;

    if (currentLocationPoint) {
      focusCurrentLocation(currentLocationPoint);
    }

    searchNearbyCafes(currentLocationPoint ?? DEFAULT_VIEWPORT.center);
  }, [
    currentLocationPoint,
    focusCurrentLocation,
    isCurrentLocationLoading,
    renderer.status,
    searchNearbyCafes,
  ]);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-slate-100 text-slate-950">
      {renderer.sdkUrl ? (
        <Script
          src={renderer.sdkUrl}
          strategy="afterInteractive"
          onReady={renderer.onScriptReady}
          onError={renderer.onScriptError}
        />
      ) : null}

      <MapView renderer={renderer} viewport={DEFAULT_VIEWPORT} />
      {mapNotice ? (
        <Toast
          key={mapNotice.message}
          message={mapNotice.message}
          durationMs={mapNotice.durationMs}
        />
      ) : null}
      <BottomSheet
        open={filteredCafePlaces.length > 0}
        expanded={storeBottomSheet.isExpanded}
        onExpandedChange={storeBottomSheet.changeExpanded}
      >
        {storeBottomSheet.mode === "detail" &&
        storeBottomSheet.selectedStore ? (
          <CafeStoreDetail
            place={storeBottomSheet.selectedStore}
            onBackToList={storeBottomSheet.showStoreList}
          />
        ) : (
          <CafeSearchResultList
            places={filteredCafePlaces}
            onPlaceSelect={storeBottomSheet.selectStore}
          />
        )}
      </BottomSheet>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-4 sm:p-6">
        <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur">
            <span className="text-lg font-bold tracking-normal text-coffit-brand">
              Coffit
            </span>
            <div className="h-5 w-px bg-slate-200" />
            <p className="truncate text-sm font-medium text-slate-700">
              주변 저가 프랜차이즈 카페
            </p>
          </div>
          <Chips
            ariaLabel="브랜드 필터"
            items={LOW_COST_COFFEE_BRANDS}
            selectedValues={selectedBrandIds}
            onSelectedValuesChange={changeBrandFilter}
            selectAllLabel="전체"
          />
        </div>
      </div>
    </main>
  );
}

function getMapNotice({
  mapStatus,
  currentLocationError,
}: {
  mapStatus: MapRendererStatus;
  currentLocationError: GeolocationPositionError | null;
}) {
  if (mapStatus === "error") {
    return {
      message: "지도를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.",
      durationMs: null,
    };
  }

  if (mapStatus !== "ready") {
    return null;
  }

  if (
    currentLocationError &&
    currentLocationError.code === currentLocationError.PERMISSION_DENIED
  ) {
    return {
      message: "위치 권한이 차단되어 강남역 기준으로 표시합니다.",
      durationMs: 3000,
    };
  }

  if (currentLocationError) {
    return {
      message: "현재 위치를 가져오지 못해 강남역 기준으로 표시합니다.",
      durationMs: 3000,
    };
  }

  return null;
}
