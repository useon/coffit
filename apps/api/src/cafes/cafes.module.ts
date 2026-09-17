import { Module } from "@nestjs/common";
import { CafesController } from "./cafes.controller";
import { CafesService } from "./cafes.service";
import { KakaoLocalModule } from "../shared/kakao-local/kakao-local.module";

@Module({
  imports: [KakaoLocalModule],
  controllers: [CafesController],
  providers: [CafesService],
})
export class CafesModule {}
