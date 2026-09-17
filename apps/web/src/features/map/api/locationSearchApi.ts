import type { LocationCandidate } from "@/features/map/domain/types";
import { getJson } from "@/shared/api/client";

type SearchLocationsResponse = {
  locations: LocationCandidateResponse[];
};

type LocationCandidateResponse = {
  id: string;
  name: string;
  position: {
    latitude: number;
    longitude: number;
  };
  address: string;
  roadAddress: string;
  categoryName: string;
};

export async function fetchLocations(query: string) {
  const data = await getJson<SearchLocationsResponse>({
    path: "/locations/search",
    query: { query },
  });

  return data.locations.map(toLocationCandidate);
}

function toLocationCandidate(
  location: LocationCandidateResponse,
): LocationCandidate {
  return {
    id: location.id,
    name: location.name,
    position: location.position,
    address: location.address,
    roadAddress: location.roadAddress,
    categoryName: location.categoryName,
  };
}
