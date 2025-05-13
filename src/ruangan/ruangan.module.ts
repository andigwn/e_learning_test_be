import { Module } from '@nestjs/common';
import { RuanganService } from './ruangan.service';
import { RuanganController } from './ruangan.controller';

@Module({
  providers: [RuanganService],
  controllers: [RuanganController]
})
export class RuanganModule {}
