import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

type HealthResponse = {
  status: "ok";
};

@ApiTags("health")
@Controller("health")
export class HealthController {
  @Get()
  @ApiOkResponse({
    description: "API server health check",
    schema: {
      example: {
        status: "ok",
      },
    },
  })
  getHealth(): HealthResponse {
    return {
      status: "ok",
    };
  }
}
