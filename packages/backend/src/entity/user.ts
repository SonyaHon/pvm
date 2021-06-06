import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { omit } from 'lodash';

export interface UserFrontend {
  id: string;
  username: string;
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  frontendify(): UserFrontend {
    return omit(this, 'password');
  }
}
