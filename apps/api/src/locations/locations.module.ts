import { Module } from "@nestjs/common";
import { KakaoLocalModule } from "../shared/kakao-local/kakao-local.module";
import { LocationsController } from "./locations.controller";
import { LocationsService } from "./locations.service";

@Module({
  imports: [KakaoLocalModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
