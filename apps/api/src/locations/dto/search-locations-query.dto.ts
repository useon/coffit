import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";

export class SearchLocationsQueryDto {
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  @ApiProperty({
    description: "Keyword for finding an address or landmark",
    example: "성수역",
  })
  query!: string;
}
