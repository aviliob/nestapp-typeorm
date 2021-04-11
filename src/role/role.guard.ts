import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthService } from "src/auth/auth.service";
import { RoleEnum, ROLES_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.get<RoleEnum[]>(ROLES_KEY, context.getHandler());

    if (!requiredRoles) return true;

    const { headers } = context.switchToHttp().getRequest();
    const token = headers.authorization.split(' ')[1];
    const tokenInfo = this.authService.decodeToken(token);

    return tokenInfo && tokenInfo.idRole && requiredRoles.some((role) => tokenInfo.idRole === role);
  }
}