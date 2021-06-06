import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { DiskStorage } from './disk.storage';
import { VideoDTO } from '../video/video.service';
import { ESize } from '../entity/actor';
import { ActorService } from '../actor/actor.service';
import { FileService } from './file.service';

export type IdOrString = { id: string } | { data: string };

export class ActorDTO {
  name: string;
  aka?: string;
  penisSize?: ESize;
  breastsSize?: ESize;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  bio?: string;
  sex: IdOrString;
  videos: string[];
}

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly actorService: ActorService,
  ) {}

  @Post('/video')
  @UseInterceptors(FileInterceptor('file', { storage: DiskStorage }))
  uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: VideoDTO,
  ) {
    console.log(file);
  }

  @Post('/actor')
  @UseInterceptors(FileInterceptor('file', { storage: DiskStorage }))
  async uploadActor(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ActorDTO,
  ) {
    const fileEntity = await this.fileService.save(file);
    this.actorService.create({
      ...body,
      profileImage: fileEntity,
    });
  }
}
