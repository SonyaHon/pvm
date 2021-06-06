import { Injectable } from '@nestjs/common';
import { IdOrString } from '../file/file.controller';
import { SexEntity } from '../entity/sex';

@Injectable()
export class SexService {
  async getOrCreate(param: IdOrString): Promise<SexEntity> {}
}
