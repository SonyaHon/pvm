import { Injectable } from '@nestjs/common';
import { ActorDTO } from '../file/file.controller';
import { FileEntity } from '../entity/file';
import { ActorEntity } from '../entity/actor';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from '../entity/video';
import { Repository } from 'typeorm';
import { VideoService } from '../video/video.service';
import { SexService } from '../sex/sex.service';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    private readonly videoService: VideoService,
    private readonly sexService: SexService,
  ) {}

  async create(
    data: ActorDTO & { profileImage: FileEntity },
  ): Promise<ActorEntity> {
    const actor = new ActorEntity();

    actor.name = data.name;
    actor.aka = data.aka;
    actor.penisSize = data.penisSize;
    actor.breastsSize = data.breastsSize;
    actor.height = data.height;
    actor.weight = data.weight;
    actor.hairColor = data.hairColor;
    actor.eyeColor = data.eyeColor;
    actor.bio = data.bio;
    actor.profileImage = data.profileImage;
    actor.videos = await this.videoService.getByIds(data.videos);
    actor.sex = await this.getOrCreate(data.sex);

    await this.actorRepository.save(actor);

    return actor;
  }
}
