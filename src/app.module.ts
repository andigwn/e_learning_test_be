import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { JurusanModule } from './jurusan/jurusan.module';
import { MapelModule } from './mapel/mapel.module';
import { RuanganModule } from './ruangan/ruangan.module';
import { AbsensiModule } from './absensi/absensi.module';
import { SiswaModule } from './siswa/siswa.module';
import { AdminModule } from './admin/admin.module';
import { JadwalModule } from './jadwal/jadwal.module';
import { GuruModule } from './guru/guru.module';

@Module({
  imports: [CommonModule, UsersModule, DashboardModule, JurusanModule, MapelModule, RuanganModule, AbsensiModule, SiswaModule, AdminModule, JadwalModule, GuruModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
