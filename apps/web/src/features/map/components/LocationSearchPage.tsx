"use client";

import { useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { fetchLocations } from "@/features/map/api/locationSearchApi";
import { LocationSearchField } from "@/features/map/components/LocationSearchField";
import { createSearchParamsWithSelectedLocation } from "@/features/map/domain/locationSearchParams";
import type { LocationCandidate } from "@/features/map/domain/types";

export function LocationSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locations, setLocations] = useState<LocationCandidate[]>([]);
  const mapQueryString = searchParams.toString();
  const mapHref = mapQueryString ? `/?${mapQueryString}` : "/";

  const searchLocations = async (keyword: string) => {
    setLocations([]);

    try {
      const nextLocations = await fetchLocations(keyword);
      setLocations(nextLocations);
    } catch {
      setLocations([]);
    }
  };

  const selectLocation = (location: LocationCandidate) => {
    const nextSearchParams = createSearchParamsWithSelectedLocation({
      searchParams,
      location,
    });

    router.push(`/?${nextSearchParams.toString()}`, { scroll: false });
  };

  return (
    <main className="flex min-h-dvh flex-col bg-white text-slate-950">
      <header className="flex h-16 items-center gap-2 border-b border-slate-100 px-4 sm:px-6">
        <Link
          href={mapHref}
          aria-label="지도 탐색으로 돌아가기"
          className="grid size-10 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <LocationSearchField onSearch={searchLocations} />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-5 sm:px-6">
        {locations.length > 0 ? (
          <ul className="divide-y divide-slate-100">
            {locations.map((location) => (
              <li key={location.id}>
                <button
                  type="button"
                  className="flex w-full items-start gap-3 px-2 py-4 text-left transition-colors hover:bg-slate-50"
                  onClick={() => {
                    selectLocation(location);
                  }}
                >
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-coffit-brand"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-base font-bold text-slate-950">
                      {location.name}
                    </span>
                    <span className="mt-1 block truncate text-sm font-medium text-slate-500">
                      {location.roadAddress || location.address}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}
