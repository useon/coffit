export type KakaoLatLng = object;

export type KakaoMapInstance = {
  setCenter: (center: KakaoLatLng) => void;
};

export type KakaoMarkerInstance = {
  setMap: (map: KakaoMapInstance | null) => void;
  setPosition: (position: KakaoLatLng) => void;
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
  }) => KakaoMarkerInstance;
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}
