import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(private readonly jwtService: JwtService) { }
    
    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)

        if (!token) throw new UnauthorizedException("Вы не авторизованы!")
        try {
            const payload = await this.jwtService.verifyAsync(token)
            request['user'] = payload
        } catch (error) {
            throw new UnauthorizedException("Вы не авторизованы!")
        }
        return true
    }

    private extractTokenFromHeader(requst: Request): string | undefined {
        const [type, token] = requst.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}
