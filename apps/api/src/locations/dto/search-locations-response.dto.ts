import { ApiProperty } from "@nestjs/swagger";

export class LocationPointDto {
  @ApiProperty({ example: 37.5446 })
  latitude!: number;

  @ApiProperty({ example: 127.0559 })
  longitude!: number;
}

export class LocationCandidateDto {
  @ApiProperty({ example: "21160691" })
  id!: string;

  @ApiProperty({ example: "성수역" })
  name!: string;

  @ApiProperty({ type: LocationPointDto })
  position!: LocationPointDto;

  @ApiProperty({ example: "서울 성동구 성수동2가" })
  address!: string;

  @ApiProperty({ example: "서울 성동구 아차산로 100" })
  roadAddress!: string;

  @ApiProperty({ example: "교통,수송 > 지하철,전철 > 2호선" })
  categoryName!: string;
}

export class SearchLocationsResponseDto {
  @ApiProperty({ type: [LocationCandidateDto] })
  locations!: LocationCandidateDto[];
}
