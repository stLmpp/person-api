import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRespository } from './person.respository';
import { PersonEntity } from './person.entity';
import { PersonAddDto, PersonUpdateDto } from './person.dto';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(private personRespository: PersonRespository) {}

  async add(dto: PersonAddDto): Promise<PersonEntity> {
    return this.personRespository.save(dto);
  }

  async update(idPerson: number, dto: PersonUpdateDto): Promise<PersonEntity> {
    await this.personRespository.update(idPerson, dto);
    return this.findById(idPerson);
  }

  async delete(idPerson: number): Promise<void> {
    await this.personRespository.softDelete(idPerson);
  }

  async findAll(): Promise<PersonEntity[]> {
    return this.personRespository.find();
  }

  async findById(idPerson: number): Promise<PersonEntity> {
    const person = await this.personRespository.findOne(idPerson);
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return person;
  }

  async findDeleted(): Promise<PersonEntity[]> {
    return this.personRespository.find({ withDeleted: true, where: { deletedDate: Not(IsNull()) } });
  }

  async restore(idPerson: number): Promise<PersonEntity> {
    await this.personRespository.restore(idPerson);
    return this.findById(idPerson);
  }
}
