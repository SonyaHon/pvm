import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config, ENodeEnv } from './config';
import { merge } from 'lodash';
import { UserEntity } from './entity/user';
import { AuthModule } from './auth/auth.module';
import { VideoModule } from './video/video.module';
import { FileModule } from './file/file.module';
import { ActorModule } from './actor/actor.module';
import { TagModule } from './tag/tag.module';
import { ActorEntity } from './entity/actor';
import { FileEntity } from './entity/file';
import { TagEntity } from './entity/tag';
import { VideoEntity } from './entity/video';
import { SexModule } from './sex/sex.module';

const typeOrmModuleOptions: Record<ENodeEnv, TypeOrmModuleOptions> = {
  [ENodeEnv.DEVELOPMENT]: {
    type: 'sqlite',
    database: 'database.dev.sqlite',
    synchronize: true,
  } as TypeOrmModuleOptions,
  [ENodeEnv.TEST]: {
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
  },
  [ENodeEnv.PRODUCTION]: {},
};

const typeOrmEntities = {
  entities: [UserEntity, ActorEntity, FileEntity, TagEntity, VideoEntity],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(
      merge(typeOrmModuleOptions[ENodeEnv.DEVELOPMENT], typeOrmEntities),
    ),
    UserModule,
    AuthModule,
    VideoModule,
    FileModule,
    ActorModule,
    TagModule,
    SexModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
