import { CafesService } from "./cafes.service";
import { KakaoLocalClient } from "./clients/kakao-local.client";
import { KakaoCafePlace } from "./dto/search-cafes-response.dto";

describe("카페 검색 서비스", () => {
  it("저가커피 브랜드 카페만 브랜드 정보를 붙여 거리순으로 반환한다", async () => {
    const kakaoLocalClient = {
      searchCafePlaces: jest.fn<Promise<KakaoCafePlace[]>, []>().mockResolvedValue([
        createKakaoCafePlace({
          id: "starbucks",
          name: "스타벅스 강남점",
          distanceMeters: 80,
        }),
        createKakaoCafePlace({
          id: "compose",
          name: "컴포즈커피 역삼점",
          distanceMeters: 120,
        }),
        createKakaoCafePlace({
          id: "mega",
          name: "메가커피 강남역점",
          distanceMeters: 40,
        }),
      ]),
    } satisfies Pick<KakaoLocalClient, "searchCafePlaces">;
    const service = new CafesService(
      kakaoLocalClient as unknown as KakaoLocalClient,
    );

    const result = await service.searchCafes({
      lat: 37.4979,
      lng: 127.0276,
    });

    expect(kakaoLocalClient.searchCafePlaces).toHaveBeenCalledWith({
      latitude: 37.4979,
      longitude: 127.0276,
    });
    expect(result.places).toEqual([
      expect.objectContaining({
        id: "mega",
        brandId: "mega",
        brandName: "메가MGC커피",
        distanceMeters: 40,
      }),
      expect.objectContaining({
        id: "compose",
        brandId: "compose",
        brandName: "컴포즈커피",
        distanceMeters: 120,
      }),
    ]);
  });
});

function createKakaoCafePlace({
  id,
  name,
  distanceMeters,
}: {
  id: string;
  name: string;
  distanceMeters: number;
}): KakaoCafePlace {
  return {
    id,
    name,
    distanceMeters,
    position: {
      latitude: 37.4979,
      longitude: 127.0276,
    },
    address: "서울 강남구 역삼동",
    roadAddress: "서울 강남구 테헤란로",
    phone: "02-000-0000",
    placeUrl: `https://place.map.kakao.com/${id}`,
    categoryName: "음식점 > 카페",
  };
}
