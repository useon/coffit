"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Locate, RotateCw } from "lucide-react";
import Script from "next/script";

import { useCafeSearch } from "@/features/map/api/useCafeSearch";
import { useKakaoCafeMarkers } from "@/features/map/adapters/kakao/useKakaoCafeMarkers";
import { useKakaoCurrentLocationMarker } from "@/features/map/adapters/kakao/useKakaoCurrentLocationMarker";
import { useKakaoMapRenderer } from "@/features/map/adapters/kakao/useKakaoMapRenderer";
import { LOW_COST_COFFEE_BRANDS } from "@/features/map/domain/lowCostCoffeeBrands";
import type { LowCostCoffeeBrandId } from "@/features/map/domain/lowCostCoffeeBrands";
import type { MapViewport } from "@/features/map/domain/types";
import type {
  CafeSearchStatus,
  MapRendererStatus,
} from "@/features/map/ports/types";
import type { GeoPoint } from "@/shared/geo/types";
import { useCurrentLocation } from "@/shared/geo/useCurrentLocation";
import { BottomSheet } from "@/shared/ui/BottomSheet";
import { Chips } from "@/shared/ui/Chips";
import { Toast } from "@/shared/ui/Toast";

import { CafeSearchResultList } from "./CafeSearchResultList";
import { CafeStoreDetail } from "./CafeStoreDetail";
import { MapView } from "./MapView";
import { useBrandFilterSearchParams } from "./useBrandFilterSearchParams";
import { useMapAreaSearch } from "./useMapAreaSearch";
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
  const { cafeSearch, searchNearbyCafes } = useCafeSearch();
  const filteredCafePlaces = useMemo(
    () =>
      cafeSearch.places.filter((place) =>
        selectedBrandIds.includes(place.brandId),
      ),
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
  const { isSearchPending, isSearching, searchCurrentArea } =
    useMapAreaSearch({
      currentCenter: renderer.center,
      searchedCenter: cafeSearch.center,
      searchStatus: cafeSearch.status,
      getCenterPoint: renderer.getCenterPoint,
      searchNearbyCafes,
    });
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
  const canFocusCurrentLocation =
    renderer.status === "ready" &&
    !isCurrentLocationLoading &&
    currentLocationPoint !== null;
  const mapNotice = getMapNotice({
    mapStatus: renderer.status,
    cafeSearchStatus: cafeSearch.status,
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

    const initialSearchCenter = currentLocationPoint ?? DEFAULT_VIEWPORT.center;
    searchNearbyCafes(initialSearchCenter);
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

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6">
        <div className="pointer-events-auto mx-auto max-w-3xl">
          <Chips
            ariaLabel="브랜드 필터"
            items={LOW_COST_COFFEE_BRANDS}
            selectedValues={selectedBrandIds}
            onSelectedValuesChange={changeBrandFilter}
            selectAllLabel="전체"
          />
        </div>
      </div>
      {isSearchPending ? (
        <div className="pointer-events-none absolute inset-x-0 top-28 z-10 flex justify-center px-4 sm:top-24">
          <button
            type="button"
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-coffit-brand px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSearching}
            onClick={searchCurrentArea}
          >
            <RotateCw aria-hidden="true" size={16} strokeWidth={2.5} />
            현 위치에서 검색
          </button>
        </div>
      ) : null}
      <div className="pointer-events-none absolute top-28 right-4 z-10 sm:top-24 sm:right-6">
        <button
          type="button"
          aria-label="현재 위치로 이동"
          title="현재 위치로 이동"
          className="pointer-events-auto grid size-11 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur transition-colors hover:bg-white hover:text-coffit-brand disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canFocusCurrentLocation}
          onClick={() => {
            if (!currentLocationPoint) {
              return;
            }

            focusCurrentLocation(currentLocationPoint);
          }}
        >
          <Locate aria-hidden="true" size={20} strokeWidth={2.25} />
        </button>
      </div>
    </main>
  );
}

function getMapNotice({
  mapStatus,
  cafeSearchStatus,
  currentLocationError,
}: {
  mapStatus: MapRendererStatus;
  cafeSearchStatus: CafeSearchStatus;
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

  if (cafeSearchStatus === "error") {
    return {
      message: "카페를 검색하지 못했습니다. 잠시 후 다시 시도해주세요.",
      durationMs: 3000,
    };
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
