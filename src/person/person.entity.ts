import { Column, DeleteDateColumn, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base-entity';
import { PersonGenderEnum } from './person-gender.enum';

@Entity()
export class PersonEntity extends BaseEntity {
  @Column({ length: 200 })
  firstName!: string;

  @Column({ length: 200 })
  lastName!: string;

  @Column({ type: 'timestamp', nullable: true })
  birthDate?: Date | null;

  @Column({ nullable: true, enum: PersonGenderEnum, type: 'enum' })
  gender?: PersonGenderEnum | null;

  @Column({ type: 'character varying', nullable: true })
  email?: string | null;

  @Column({ type: 'character varying', nullable: true })
  phone?: string | null;

  @Column({ type: 'character varying', nullable: true })
  photo?: string | null;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedDate?: Date | null;
}
