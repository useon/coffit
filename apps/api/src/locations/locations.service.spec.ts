import {
  KakaoLocalClient,
  KakaoPlace,
} from "../shared/kakao-local/kakao-local.client";
import { LocationsService } from "./locations.service";

describe("장소 검색 서비스", () => {
  it("키워드와 일치하는 장소 후보를 화면용 계약으로 반환한다", async () => {
    const kakaoLocalClient = {
      searchPlacesByKeyword: jest
        .fn<Promise<KakaoPlace[]>, [string]>()
        .mockResolvedValue([
          createKakaoPlace({
            id: "seongsu-station",
            name: "성수역",
            categoryName: "교통,수송 > 지하철,전철 > 2호선",
          }),
        ]),
    } satisfies Pick<KakaoLocalClient, "searchPlacesByKeyword">;
    const service = new LocationsService(
      kakaoLocalClient as unknown as KakaoLocalClient,
    );

    const result = await service.searchLocations({ query: "성수역" });

    expect(kakaoLocalClient.searchPlacesByKeyword).toHaveBeenCalledWith(
      "성수역",
    );
    expect(result).toEqual({
      locations: [
        {
          id: "seongsu-station",
          name: "성수역",
          position: {
            latitude: 37.5446,
            longitude: 127.0559,
          },
          address: "서울 성동구 성수동2가",
          roadAddress: "서울 성동구 아차산로 100",
          categoryName: "교통,수송 > 지하철,전철 > 2호선",
        },
      ],
    });
  });
});

function createKakaoPlace({
  id,
  name,
  categoryName,
}: {
  id: string;
  name: string;
  categoryName: string;
}): KakaoPlace {
  return {
    id,
    name,
    position: {
      latitude: 37.5446,
      longitude: 127.0559,
    },
    address: "서울 성동구 성수동2가",
    roadAddress: "서울 성동구 아차산로 100",
    phone: "",
    placeUrl: `https://place.map.kakao.com/${id}`,
    categoryName,
  };
}
