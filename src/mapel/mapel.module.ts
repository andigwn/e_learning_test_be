import { Module } from '@nestjs/common';
import { MapelService } from './mapel.service';
import { MapelController } from './mapel.controller';

@Module({
  providers: [MapelService],
  controllers: [MapelController]
})
export class MapelModule {}
