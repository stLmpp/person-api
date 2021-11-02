import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRespository } from './person.respository';
import { PersonEntity } from './person.entity';
import { PersonAddDto, PersonUpdateDto } from './person.dto';

@Injectable()
export class PersonService {
  constructor(private personRespository: PersonRespository) {}

  async add(dto: PersonAddDto): Promise<PersonEntity> {
    return this.personRespository.save(dto);
  }

  async update(idPerson: number, dto: PersonUpdateDto): Promise<PersonEntity> {
    await this.personRespository.update(idPerson, dto);
    return this.personRespository.findOneOrFail(idPerson);
  }

  async delete(idPerson: number): Promise<void> {
    await this.personRespository.delete(idPerson);
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
}
