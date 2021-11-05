import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonEntity } from './person.entity';
import { PersonAddDto, PersonUpdateDto } from './person.dto';
import { RouteParamEnum } from '../shared/params';
import { ApiTags } from '@nestjs/swagger';
import { IdUser } from '../id-user.decorator';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get()
  async findAll(@IdUser() idUser: string): Promise<PersonEntity[]> {
    return this.personService.findAll(idUser);
  }

  @Get('deleted')
  async findDeleted(@IdUser() idUser: string): Promise<PersonEntity[]> {
    return this.personService.findDeleted(idUser);
  }

  @Get(`:${RouteParamEnum.idPerson}`)
  async findById(@IdUser() idUser: string, @Param(RouteParamEnum.idPerson) idPerson: number): Promise<PersonEntity> {
    return this.personService.findById(idUser, idPerson);
  }

  @Post()
  async add(@IdUser() idUser: string, @Body() dto: PersonAddDto): Promise<PersonEntity> {
    return this.personService.add(idUser, dto);
  }

  @Patch(`:${RouteParamEnum.idPerson}`)
  async update(
    @IdUser() idUser: string,
    @Param(RouteParamEnum.idPerson) idPerson: number,
    @Body() dto: PersonUpdateDto
  ): Promise<PersonEntity> {
    return this.personService.update(idUser, idPerson, dto);
  }

  @Delete(`:${RouteParamEnum.idPerson}`)
  async delete(@IdUser() idUser: string, @Param(RouteParamEnum.idPerson) idPerson: number): Promise<void> {
    return this.personService.delete(idUser, idPerson);
  }

  @Put(`:${RouteParamEnum.idPerson}/restore`)
  async restore(@IdUser() idUser: string, @Param(RouteParamEnum.idPerson) idPerson: number): Promise<PersonEntity> {
    return this.personService.restore(idUser, idPerson);
  }
}
