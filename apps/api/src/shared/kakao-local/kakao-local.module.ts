import { Module } from "@nestjs/common";
import { KakaoLocalClient } from "./kakao-local.client";

@Module({
  providers: [KakaoLocalClient],
  exports: [KakaoLocalClient],
})
export class KakaoLocalModule {}
