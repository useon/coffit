import { ApiProperty } from "@nestjs/swagger";

export class GeoPointDto {
  @ApiProperty({ example: 37.4979 })
  latitude!: number;

  @ApiProperty({ example: 127.0276 })
  longitude!: number;
}

export class CafePlaceDto {
  @ApiProperty({ example: "123456789" })
  id!: string;

  @ApiProperty({ example: "메가MGC커피 강남역점" })
  name!: string;

  @ApiProperty({ example: "mega" })
  brandId!: string;

  @ApiProperty({ example: "메가MGC커피" })
  brandName!: string;

  @ApiProperty({ example: 120 })
  distanceMeters!: number;

  @ApiProperty({ type: GeoPointDto })
  position!: GeoPointDto;

  @ApiProperty({ example: "서울 강남구 역삼동 123-45" })
  address!: string;

  @ApiProperty({ example: "서울 강남구 테헤란로 123" })
  roadAddress!: string;

  @ApiProperty({ example: "02-123-4567" })
  phone!: string;

  @ApiProperty({ example: "https://place.map.kakao.com/123456789" })
  placeUrl!: string;

  @ApiProperty({ example: "음식점 > 카페 > 커피전문점" })
  categoryName!: string;
}

export type KakaoCafePlace = Omit<CafePlaceDto, "brandId" | "brandName">;

export class SearchCafesResponseDto {
  @ApiProperty({ type: [CafePlaceDto] })
  places!: CafePlaceDto[];
}
