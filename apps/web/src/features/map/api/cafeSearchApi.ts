import type { CafePlace } from "@/features/map/domain/types";
import type { GeoPoint } from "@/shared/geo/types";
import { getJson } from "@/shared/api/client";

type SearchCafesResponse = {
  places: CafePlace[];
};

type FetchNearbyCafesParams = {
  center: GeoPoint;
};

export async function fetchNearbyCafes({
  center,
}: FetchNearbyCafesParams): Promise<CafePlace[]> {
  const data = await getJson<SearchCafesResponse>({
    path: "/cafes/search",
    query: {
      lat: center.latitude,
      lng: center.longitude,
    },
  });

  return data.places;
}
