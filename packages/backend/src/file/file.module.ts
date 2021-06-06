import { Module, OnModuleInit } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import * as fs from 'fs-extra';
import { Config } from '../config';
import { ActorModule } from '../actor/actor.module';

@Module({
  imports: [ActorModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule implements OnModuleInit {
  async onModuleInit() {
    await fs.ensureDir(Config.files.rootDirectory);
  }
}
