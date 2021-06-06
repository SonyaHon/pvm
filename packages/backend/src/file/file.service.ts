import { Injectable } from '@nestjs/common';
import { FileEntity } from '../entity/file';

@Injectable()
export class FileService {
  async save(file: Express.Multer.File): Promise<FileEntity> {}
}
