import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { LoginUsersRequest, RegisterUsersRequest,  UpdateUserRequst,  UsersResponse } from 'src/model/users.model';
import {Logger} from 'winston';
import { UsersValidation } from './users.validation';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/common/auth.service';
import { Users } from '@prisma/client';
@Injectable()
export class UsersService {
    constructor(
        private validationService: ValidationSerivice,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private authSercvice: AuthService

    ) {}
    async register(request: RegisterUsersRequest): Promise<UsersResponse>{
        this.logger.debug(`Register new users${JSON.stringify(request)}`);
        const registerRequest: RegisterUsersRequest = await this.validationService.validate(UsersValidation.REGISTER, request);

        if (registerRequest.password.length < 8) {
            throw new HttpException('Password must be at least 8 characters', 400);
        }

        const totalUsersWithSameUsername = await this.prismaService.users.count({
            where: {
                username: registerRequest.username
            }
        });

        if (totalUsersWithSameUsername != 0) {
            throw new HttpException('Username already exists', 400);
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const users = await this.prismaService.users.create({
            data: registerRequest
        });
        return {
            id_users: users.id_users,
            username: users.username,
            id_role: users.id_role
        };
    }
    async login(request: LoginUsersRequest): Promise<UsersResponse>{
        this.logger.debug(`Login users Successfully ${JSON.stringify(request)}`);
        const loginRequest: LoginUsersRequest = await this.validationService.validate(UsersValidation.LOGIN, request);
        const user = await this.prismaService.users.findFirst({
            where:{
                username: loginRequest.username
            }
        })
        if (!user) {
            throw new HttpException('username or password invalid', 401);
        } 
        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('username or password invalid', 400);
        }

        const token = await this.authSercvice.generateToken(user);

        await this.prismaService.users.update({
            where: {
                id_users: user.id_users
            },
            data: {
                token: token.access_token
            }
        })
        return {
            username: user.username,
            id_role: user.id_role,
            token: token.access_token
        };
    }

    async get(user: Users): Promise <UsersResponse> {
        return {
            username: user.username,
            id_role: user.id_role
        }
    }

    async update(user: Users, request: UpdateUserRequst): Promise<UsersResponse>{
        this.logger.debug(`Users Service.update(${JSON.stringify(user)}, ${JSON.stringify(request)})`)
        const userUpadate: UpdateUserRequst = await this.validationService.validate(UsersValidation.UPDATE, request) 
        if (userUpadate.password) {
            user.password = await bcrypt.hash(userUpadate.password, 10)
        }

        const result = await this.prismaService.users.update({
            where: {
                id_users: user.id_users
            },
            data: userUpadate
        });
        return {
            id_users: result.id_users,
            username: result.username,
            id_role: result.id_role
        }
    }
    async logout(user: Users): Promise<UsersResponse>{
        const result = await this.prismaService.users.update({
            where:{
                id_users: user.id_users
            },
            data: {
                token: null
            }
        });
        return {
            id_users: result.id_users,
            username: result.username,
            id_role : result.id_role
        }
    }

}
