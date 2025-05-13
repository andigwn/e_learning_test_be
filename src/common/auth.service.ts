import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Users } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(users: Users): Promise<{access_token: string}>{
        const payload = {
            sub: users.id_users,
            username: users.username,
            id_role: users.id_role
        }
        try {
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            throw new HttpException('Failed to generate token', 400);
        }
    }
}