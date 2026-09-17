import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CafesModule } from "./cafes/cafes.module";
import { HealthModule } from "./health/health.module";
import { LocationsModule } from "./locations/locations.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    CafesModule,
    LocationsModule,
  ],
})
export class AppModule {}
