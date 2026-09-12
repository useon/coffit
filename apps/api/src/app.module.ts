import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CafesModule } from "./cafes/cafes.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    CafesModule,
  ],
})
export class AppModule {}
