// src/common/roles.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { PrismaService } from './prisma.service';
  import { ROLES_KEY } from './roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private prisma: PrismaService, // Inject PrismaService untuk akses database
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // 1. Baca role yang diizinkan dari decorator @Roles()
      const requiredRoles = this.reflector.get<number[]>(
        ROLES_KEY,
        context.getHandler(),
      );
  
      // Jika tidak ada decorator @Roles, endpoint bisa diakses semua role
      if (!requiredRoles) {
        return true;
      }
  
      // 2. Dapatkan token dari header request
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];
  
      if (!token) {
        throw new UnauthorizedException('Token tidak ditemukan');
      }
  
      // 3. Cari user di database berdasarkan token
      const user = await this.prisma.users.findFirst({
        where: { token }, // Asumsi token disimpan di kolom `token` tabel `users`
        select: { id_role: true }, // Ambil hanya role_id untuk efisiensi
      });
  
      if (!user) {
        throw new UnauthorizedException('Token tidak valid');
      }
  
      // 4. Bandingkan role user dengan role yang diizinkan
      if (!requiredRoles.includes(user.id_role)) {
        throw new ForbiddenException(
          'access denied',
        );
      }
  
      return true;
    }
  }