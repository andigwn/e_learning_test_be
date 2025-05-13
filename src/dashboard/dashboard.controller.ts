
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';

@Controller('/api/dashboard')
@UseGuards( RolesGuard)
export class DashboardController {
  @Get('/superadmin')
  @Roles(4)
  getSuperAdminDashboard() {
    return { 
      menu: ['Manajemen User', 'Manajemen Admin', 'Data Jurusan', 'Data Kelas', 'Log Aktivitas'],
      data: { totalUsers: 10, totalJurusan: 5 } 
    };
  }
  @Get('/admin')
  @Roles(1, 4)
  getAdminDashboard() {
    return { 
      menu: ['Manajemen User', 'Data Jurusan', 'Data Kelas', 'Log Aktivitas'],
      data: { totalUsers: 10, totalJurusan: 5 } 
    };
  }

  @Get('/guru')
  @Roles(2, 4)
  getGuruDashboard() {
    return { 
      menu: ['Buat Materi', 'Buat Tugas', 'Lihat Nilai', 'Absensi'],
      data: { totalMateri: 8, totalSiswa: 30 } 
    };
  }

  @Get('/siswa')
  @Roles(3, 4)
  getSiswaDashboard() {
    return { 
      menu: ['Materi Pelajaran', 'Tugas', 'Nilai', 'Diskusi'],
      data: { tugasPending: 3, nilaiRata: 85 } 
    };
  }
}