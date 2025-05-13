import { Injectable, NestMiddleware } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor (
        private prismaService: PrismaService
    ) {}
    async use(req: any, res: any, next: (error?: any) => void) {
        const authHeader = req.headers['authorization'] as string;
        let token: string | null = null;

        // Extract token from Bearer scheme
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remove 'Bearer ' prefix
        }

        if (token) {
            const user = await this.prismaService.users.findFirst({
                where: {
                    token: token,
                }
            });

            if (user) {
                req.user = user;
            }
        }

        next()
    }

}