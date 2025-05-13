// src/common/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles'; // Key untuk metadata
export const Roles = (...roles: number[]) => SetMetadata(ROLES_KEY, roles);