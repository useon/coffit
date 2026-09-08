import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class SearchCafesQueryDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiProperty({
    description: "Latitude of the search center",
    example: 37.4979,
  })
  lat!: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiProperty({
    description: "Longitude of the search center",
    example: 127.0276,
  })
  lng!: number;

}
