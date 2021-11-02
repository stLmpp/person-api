import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  creationDate!: Date;

  @UpdateDateColumn({ nullable: true })
  lastUpdatedDate?: Date;
}
