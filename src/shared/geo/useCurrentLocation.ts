"use client";

import { useEffect, useState } from "react";

import type { GeoPoint } from "./types";

export type CurrentLocationState = {
  isLoading: boolean;
  point: GeoPoint | null;
  error: GeolocationPositionError | null;
  isUnsupported: boolean;
};

export function useCurrentLocation(): CurrentLocationState {
  const [location, setLocation] = useState<CurrentLocationState>(() => {
    const isSupported =
      typeof navigator !== "undefined" && "geolocation" in navigator;

    return {
      isLoading: isSupported,
      point: null,
      error: null,
      isUnsupported: !isSupported,
    };
  });

  useEffect(() => {
    if (location.isUnsupported) {
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
          isUnsupported: false,
        });
      },
      (error) => {
        setLocation({
          isLoading: false,
          point: null,
          error,
          isUnsupported: false,
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60_000,
        timeout: 10_000,
      },
    );
  }, [location.isUnsupported]);

  return location;
}
