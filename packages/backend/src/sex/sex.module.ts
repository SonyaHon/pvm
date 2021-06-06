import { Module } from '@nestjs/common';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';

@Module({
  providers: [SexService],
  controllers: [SexController]
})
export class SexModule {}
