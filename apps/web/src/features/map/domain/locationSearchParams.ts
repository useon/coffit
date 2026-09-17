import type { GeoPoint } from "@/shared/geo/types";

const LOCATION_LATITUDE_SEARCH_PARAM = "lat";
const LOCATION_LONGITUDE_SEARCH_PARAM = "lng";
const LOCATION_NAME_SEARCH_PARAM = "place";

type ReadableSearchParams = Pick<URLSearchParams, "get" | "toString">;

export type SelectedLocation = {
  name: string;
  position: GeoPoint;
};

export function parseSelectedLocationFromSearchParams(
  searchParams: ReadableSearchParams,
): SelectedLocation | null {
  const name = searchParams.get(LOCATION_NAME_SEARCH_PARAM);
  const latitude = Number(searchParams.get(LOCATION_LATITUDE_SEARCH_PARAM));
  const longitude = Number(searchParams.get(LOCATION_LONGITUDE_SEARCH_PARAM));

  if (
    !name ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return {
    name,
    position: { latitude, longitude },
  };
}

export function createSearchParamsWithSelectedLocation({
  searchParams,
  location,
}: {
  searchParams: ReadableSearchParams;
  location: SelectedLocation;
}) {
  const nextSearchParams = new URLSearchParams(searchParams.toString());

  nextSearchParams.set(
    LOCATION_LATITUDE_SEARCH_PARAM,
    String(location.position.latitude),
  );
  nextSearchParams.set(
    LOCATION_LONGITUDE_SEARCH_PARAM,
    String(location.position.longitude),
  );
  nextSearchParams.set(LOCATION_NAME_SEARCH_PARAM, location.name);

  return nextSearchParams;
}
