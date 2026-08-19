export type KakaoLatLng = object;

export type KakaoMapInstance = object;

export type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level: number },
  ) => KakaoMapInstance;
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMaps;
    };
  }
}
