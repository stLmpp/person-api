import { EntityRepository, Repository } from 'typeorm';
import { PersonEntity } from './person.entity';

@EntityRepository(PersonEntity)
export class PersonRespository extends Repository<PersonEntity> {}
