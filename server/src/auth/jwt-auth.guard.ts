import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
     
      const req = context.switchToHttp().getRequest();

      try {
        const authHeader = req.headers.authorization;
        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
          throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
        }

        const user = this.jwtService.verify(token);
        req.user = user;

        return true;

      } catch(e) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
      }

  }

}