import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonEntity } from './person.entity';
import { PersonAddDto, PersonUpdateDto } from './person.dto';
import { RouteParamEnum } from '../shared/params';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get()
  async findAll(): Promise<PersonEntity[]> {
    return this.personService.findAll();
  }

  @Get(`:${RouteParamEnum.idPerson}`)
  async findById(@Param(RouteParamEnum.idPerson) idPerson: number): Promise<PersonEntity> {
    return this.personService.findById(idPerson);
  }

  @Post()
  async add(@Body() dto: PersonAddDto): Promise<PersonEntity> {
    return this.personService.add(dto);
  }

  @Patch(`:${RouteParamEnum.idPerson}`)
  async update(@Param(RouteParamEnum.idPerson) idPerson: number, @Body() dto: PersonUpdateDto): Promise<PersonEntity> {
    return this.personService.update(idPerson, dto);
  }

  @Delete(`:${RouteParamEnum.idPerson}`)
  async delete(@Param(RouteParamEnum.idPerson) idPerson: number): Promise<void> {
    return this.personService.delete(idPerson);
  }
}
