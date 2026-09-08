import { Module } from "@nestjs/common";
import { CafesController } from "./cafes.controller";
import { CafesService } from "./cafes.service";
import { KakaoLocalClient } from "./clients/kakao-local.client";

@Module({
  controllers: [CafesController],
  providers: [CafesService, KakaoLocalClient],
})
export class CafesModule {}
