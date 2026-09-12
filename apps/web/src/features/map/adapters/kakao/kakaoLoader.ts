const sdkAppKey = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;

export const kakaoSdkUrl = sdkAppKey
  ? `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${sdkAppKey}&autoload=false`
  : undefined;
