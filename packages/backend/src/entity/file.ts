import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: string;

  @Column()
  originalName: string;
}
