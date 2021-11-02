import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRespository } from './person.respository';

@Module({
  imports: [TypeOrmModule.forFeature([PersonRespository])],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
