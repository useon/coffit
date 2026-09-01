"use client";

import { useEffect, useState } from "react";

import type { GeoPoint } from "./types";

export type CurrentLocationState = {
  isLoading: boolean;
  point: GeoPoint | null;
  error: GeolocationPositionError | null;
};

export function useCurrentLocation(): CurrentLocationState {
  const [location, setLocation] = useState<CurrentLocationState>({
    isLoading: true,
    point: null,
    error: null,
  });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          isLoading: false,
          point: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
        });
      },
      (error) => {
        setLocation({
          isLoading: false,
          point: null,
          error,
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 10000,
      },
    );
  }, []);

  return location;
}
