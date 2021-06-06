import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SexEntity } from './sex';
import { VideoEntity } from './video';
import { FileEntity } from './file';

export enum ESize {
  TINY = 'tiny',
  SMALL = 'small',
  AVERAGE = 'average',
  BIG = 'big',
  GIANT = 'giant',
}

@Entity('actors')
export class ActorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  aka: string;

  @Column({
    nullable: true,
  })
  penisSize: ESize;

  @Column({
    nullable: true,
  })
  breastsSize: ESize;

  @Column({
    nullable: true,
  })
  height: number;

  @Column({
    nullable: true,
  })
  weight: number;

  @Column({
    nullable: true,
  })
  hairColor: string;

  @Column({
    nullable: true,
  })
  eyeColor: string;

  @Column({
    nullable: true,
  })
  bio: string;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  profileImage: FileEntity;

  @OneToOne(() => SexEntity)
  @JoinColumn()
  sex: SexEntity;

  @ManyToMany(() => VideoEntity, (video) => video.actors)
  @JoinTable()
  videos: VideoEntity[];
}
