import type { CafePlace } from "@/features/map/domain/types";

type CafeSearchResultListProps = {
  places: CafePlace[];
  onPlaceSelect: (placeId: string) => void;
};

export function CafeSearchResultList({
  places,
  onPlaceSelect,
}: CafeSearchResultListProps) {
  return (
    <ul className="divide-y divide-slate-100">
      {places.map((place) => (
        <li key={place.id}>
          <button
            type="button"
            className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
            onClick={() => {
              onPlaceSelect(place.id);
            }}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-950">
                {place.name}
              </p>
              <p className="mt-1 line-clamp-2 text-sm font-medium leading-5 text-slate-500">
                {place.roadAddress || place.address}
              </p>
            </div>
            <span className="shrink-0 text-sm font-bold text-coffit-brand">
              {formatDistance(place.distanceMeters)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function formatDistance(distanceMeters: number) {
  if (distanceMeters < 1000) {
    return `${distanceMeters}m`;
  }

  return `${(distanceMeters / 1000).toFixed(1)}km`;
}
