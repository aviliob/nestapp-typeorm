import { SetMetadata } from "@nestjs/common";

export enum RoleEnum {
  User = 2,
  Admin = 1
};

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);