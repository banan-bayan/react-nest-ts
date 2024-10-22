import { CanActivate, ExecutionContext, UnauthorizedException, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]);

      if (!requiredRoles) {
        return true;
      }

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      if (!user.roles || !user.roles.some(({ description }) => requiredRoles.includes(description))) {
        throw new HttpException('У вас нет доступа', HttpStatus.FORBIDDEN);
      }

      return true;

    } catch (e) {
      throw new HttpException('Ошибка проверки доступа', HttpStatus.FORBIDDEN);
    }
  }
}
