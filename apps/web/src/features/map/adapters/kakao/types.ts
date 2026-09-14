export type KakaoSdk = NonNullable<Window["kakao"]>;

export type KakaoLatLng = {
  equals: (latlng: KakaoLatLng) => boolean;
  getLat: () => number;
  getLng: () => number;
  toString: () => string;
};

export type KakaoMapInstance = {
  getCenter: () => KakaoLatLng;
  getLevel: () => number;
  relayout: () => void;
  setCenter: (center: KakaoLatLng) => void;
};

export type KakaoMarkerInstance = {
  setMap: (map: KakaoMapInstance | null) => void;
  setPosition: (position: KakaoLatLng) => void;
  setImage: (image: KakaoMarkerImageInstance) => void;
  setZIndex: (zIndex: number) => void;
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

export type KakaoCustomOverlayInstance = {
  setMap: (map: KakaoMapInstance | null) => void;
};

export type KakaoCustomOverlayOptions = {
  content: HTMLElement | string;
  position: KakaoLatLng;
  xAnchor?: number;
  yAnchor?: number;
};

export type KakaoEventAddListener = {
  (
    target: KakaoMarkerInstance,
    type: "click",
    handler: () => void,
  ): void;
  (
    target: KakaoMapInstance,
    type: "dragend",
    handler: () => void,
  ): void;
  (
    target: KakaoMapInstance,
    type: "zoom_changed",
    handler: () => void,
  ): void;
};

export type KakaoEvent = {
  addListener: KakaoEventAddListener;
  removeListener: KakaoEventAddListener;
};

export type KakaoMaps = {
  load: (callback: () => void) => void;
  event: KakaoEvent;
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
  CustomOverlay: new (
    options: KakaoCustomOverlayOptions,
  ) => KakaoCustomOverlayInstance;
  MarkerImage: new (
    imageUrl: string,
    imageSize: KakaoSize,
    options?: KakaoMarkerImageOptions,
  ) => KakaoMarkerImageInstance;
  Point: new (x: number, y: number) => KakaoPoint;
  Size: new (width: number, height: number) => KakaoSize;
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}
