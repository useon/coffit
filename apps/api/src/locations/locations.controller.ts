import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SearchLocationsQueryDto } from "./dto/search-locations-query.dto";
import { SearchLocationsResponseDto } from "./dto/search-locations-response.dto";
import { LocationsService } from "./locations.service";

@ApiTags("locations")
@Controller("locations")
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get("search")
  @ApiOkResponse({
    description: "Address and landmark candidates matching a keyword",
    type: SearchLocationsResponseDto,
  })
  searchLocations(
    @Query() query: SearchLocationsQueryDto,
  ): Promise<SearchLocationsResponseDto> {
    return this.locationsService.searchLocations(query);
  }
}
