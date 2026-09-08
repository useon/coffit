import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CafesService } from "./cafes.service";
import { SearchCafesQueryDto } from "./dto/search-cafes-query.dto";
import { SearchCafesResponseDto } from "./dto/search-cafes-response.dto";

@ApiTags("cafes")
@Controller("cafes")
export class CafesController {
  constructor(private readonly cafesService: CafesService) {}

  @Get("search")
  @ApiOkResponse({
    description: "Low-cost cafe places around a coordinate sorted by distance",
    type: SearchCafesResponseDto,
  })
  searchCafes(
    @Query() query: SearchCafesQueryDto,
  ): Promise<SearchCafesResponseDto> {
    return this.cafesService.searchCafes(query);
  }
}
