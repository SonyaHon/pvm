import {
  BaseEntity,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActorEntity } from './actor';

@Entity('videos')
export class VideoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ActorEntity, (actor) => actor.videos)
  actors: ActorEntity[];
}
