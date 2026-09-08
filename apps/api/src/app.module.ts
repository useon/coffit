import { Module } from "@nestjs/common";
import { CafesModule } from "./cafes/cafes.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [HealthModule, CafesModule],
})
export class AppModule {}
