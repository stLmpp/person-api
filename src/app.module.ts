import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { config } from 'dotenv';
import { getTypeormConfig } from './config/ormconfig';
import { APP_GUARD } from '@nestjs/core';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';

if (process.env.NODE_ENV !== 'production') {
  config();
}

@Module({
  imports: [TypeOrmModule.forRoot(getTypeormConfig()), PersonModule, RateLimiterModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RateLimiterGuard }],
})
export class AppModule {}
