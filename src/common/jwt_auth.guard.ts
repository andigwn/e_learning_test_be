// src/common/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }

    try {
      const payload = this.jwtService.verify(token); // Verifikasi dan decode token
      request.user = payload; // Simpan payload di request.user
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token tidak valid');
    }
  }
}