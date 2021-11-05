import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRespository } from './person.respository';
import { PersonEntity } from './person.entity';
import { PersonAddDto, PersonUpdateDto } from './person.dto';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(private personRespository: PersonRespository) {}

  async add(idUser: string, dto: PersonAddDto): Promise<PersonEntity> {
    return this.personRespository.save({ ...dto, idUser });
  }

  async update(idUser: string, idPerson: number, dto: PersonUpdateDto): Promise<PersonEntity> {
    await this.personRespository.update(idPerson, dto);
    return this.findById(idUser, idPerson);
  }

  async delete(idUser: string, idPerson: number): Promise<void> {
    await this.personRespository.softDelete(idPerson);
  }

  async findAll(idUser: string): Promise<PersonEntity[]> {
    return this.personRespository.find({ where: { idUser } });
  }

  async findById(idUser: string, idPerson: number): Promise<PersonEntity> {
    const person = await this.personRespository.findOne(idPerson);
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return person;
  }

  async findDeleted(idUser: string): Promise<PersonEntity[]> {
    return this.personRespository.find({ withDeleted: true, where: { deletedDate: Not(IsNull()), idUser } });
  }

  async restore(idUser: string, idPerson: number): Promise<PersonEntity> {
    await this.personRespository.restore(idPerson);
    return this.findById(idUser, idPerson);
  }
}
