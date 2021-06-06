import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user';
import { Repository } from 'typeorm';
import { TagEntity } from '../entity/tag';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(tag: string): Promise<TagEntity> {
    const tagEntity = new TagEntity();
    tagEntity.tag = tag;
    await this.tagRepository.save(tagEntity);
    return tagEntity;
  }

  async remove(id: string): Promise<void> {
    await this.tagRepository.delete({
      id,
    });
  }

  async changeTag(id: string, newName: string): Promise<void> {
    await this.tagRepository.update(
      {
        id,
      },
      {
        tag: newName,
      },
    );
  }
}
