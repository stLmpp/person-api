import { IsDefined, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsDate } from '../shared/is-date';
import { PersonGenderEnum } from './person-gender.enum';

export class PersonAddDto {
  @IsDefined()
  @IsString()
  @MaxLength(200)
  firstName!: string;

  @IsDefined()
  @IsString()
  @MaxLength(200)
  lastName!: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsEnum(PersonGenderEnum)
  gender?: PersonGenderEnum;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class PersonUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  lastName?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsEnum(PersonGenderEnum)
  gender?: PersonGenderEnum;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
