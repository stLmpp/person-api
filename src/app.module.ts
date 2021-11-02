import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { config } from 'dotenv';
import { getTypeormConfig } from './config/ormconfig';

if (process.env.NODE_ENV !== 'production') {
  config();
}

@Module({
  imports: [TypeOrmModule.forRoot(getTypeormConfig()), PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
