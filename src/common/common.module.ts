import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma.service';
import { ValidationSerivice } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt_auth.guard';
import { AuthMiddleware } from './auth.middleware';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            format: winston.format.json(),
            transports: [
                new winston.transports.Console()
            ]
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        })
    ],
    providers: [PrismaService, AuthService, ValidationSerivice, {
        provide: APP_FILTER,
        useClass: ErrorFilter
    },
    RolesGuard ,
    JwtAuthGuard
],

    exports: [PrismaService, AuthService, ValidationSerivice, RolesGuard, JwtAuthGuard, JwtModule],
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('/api/*')
    }
}
