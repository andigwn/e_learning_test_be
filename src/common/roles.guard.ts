
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
        return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.id_role); // Kirim user.id_role sebagai number
}

  private matchRoles(allowedRoles: number[], userRole: number): boolean {
    if (!userRole) {
        return false;
    }
    return allowedRoles.includes(userRole); // Cek apakah role ada di allowedRoles
}
}