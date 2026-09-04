export const KAKAO_PLACE_SEARCH_STATUS = {
  OK: "OK",
  ZERO_RESULT: "ZERO_RESULT",
  ERROR: "ERROR",
} as const;

export type KakaoPlaceSearchStatus =
  (typeof KAKAO_PLACE_SEARCH_STATUS)[keyof typeof KAKAO_PLACE_SEARCH_STATUS];

export type KakaoSdk = NonNullable<Window["kakao"]>;

export type KakaoLatLng = {
  equals: (latlng: KakaoLatLng) => boolean;
  getLat: () => number;
  getLng: () => number;
  toString: () => string;
};

export type KakaoMapInstance = {
  getCenter: () => KakaoLatLng;
  setCenter: (center: KakaoLatLng) => void;
};

export type KakaoMarkerInstance = {
  setMap: (map: KakaoMapInstance | null) => void;
  setPosition: (position: KakaoLatLng) => void;
};

export type KakaoPoint = {
  equals: (point: KakaoPoint) => boolean;
  toString: () => string;
};

export type KakaoSize = {
  equals: (size: KakaoSize) => boolean;
  toString: () => string;
};

export type KakaoMarkerImageInstance = {
  __markerImageBrand: "KakaoMarkerImage";
};

export type KakaoMarkerImageOptions = {
  alt?: string;
  coords?: string;
  offset?: KakaoPoint;
  shape?: string;
  spriteOrigin?: KakaoPoint;
  spriteSize?: KakaoSize;
};

export type KakaoPlaceSearchResult = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type KakaoPlacesInstance = {
  categorySearch: (
    categoryCode: string,
    callback: (
      results: KakaoPlaceSearchResult[],
      status: KakaoPlaceSearchStatus,
      pagination: KakaoPagination,
    ) => void,
    options: {
      location: KakaoLatLng;
      radius?: number;
      size?: number;
    },
  ) => void;
};

export type KakaoPagination = {
  current: number;
  first: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  last: number;
  nextPage: () => void;
  perPage: number;
  prevPage: () => void;
  totalCount: number;
};

export type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level: number },
  ) => KakaoMapInstance;
  Marker: new (options: {
    map: KakaoMapInstance;
    position: KakaoLatLng;
    image?: KakaoMarkerImageInstance;
  }) => KakaoMarkerInstance;
  MarkerImage: new (
    imageUrl: string,
    imageSize: KakaoSize,
    options?: KakaoMarkerImageOptions,
  ) => KakaoMarkerImageInstance;
  Point: new (x: number, y: number) => KakaoPoint;
  Size: new (width: number, height: number) => KakaoSize;
  services: {
    Places: new (map?: KakaoMapInstance) => KakaoPlacesInstance;
    Status: typeof KAKAO_PLACE_SEARCH_STATUS;
  };
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}
