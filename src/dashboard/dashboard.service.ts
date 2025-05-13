// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getAdminData() {
    const users = await this.prisma.users.count();
    return { totalUsers: users, message: 'Admin Dashboard Data' };
  }

  async getGuruData() {
    const tasks = await this.prisma.tugas.count();
    return { totalTasks: tasks, message: 'Guru Dashboard Data' };
  }

  async getSiswaData() {
    const assignments = await this.prisma.tugas.count();
    return { totalAssignments: assignments, message: 'Siswa Dashboard Data' };
  }
}