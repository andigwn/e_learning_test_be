import { Body, Controller, Delete, Get, Header, HttpCode, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { WebResponse } from 'src/model/web.model';
import { LoginUsersRequest, RegisterUsersRequest, UpdateUserRequst, UsersResponse } from 'src/model/users.model';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';

@Controller('/api/users')
export class UsersController {
    constructor(
        private usersservice: UsersService,
    ) {}

    @Post('/register')
    @HttpCode(200)
    async register(@Body() request: RegisterUsersRequest): Promise<WebResponse<UsersResponse>> {
        const result = await this.usersservice.register(request);
        return {
            data: result,
            message: 'Register success',
        };
    }

    @Post('/login')
    @HttpCode(200)
    @Header('Content-Type', 'application/json')
    async login(@Body() request: LoginUsersRequest): Promise<WebResponse<UsersResponse>> {
        const result = await this.usersservice.login(request);

        return {
            data: result,
            message: 'Login success',
        }
    }

    @Get('/current')
    @HttpCode(200)
    @Header('Content-Type', 'application/json')
    async get(@Auth() user: Users): Promise<WebResponse<UsersResponse>> {
        const result = await this.usersservice.get(user);
        return {
            data: result,
            message: 'Data users'
        }
    }
    @Patch('/update')
    @HttpCode(200)
    @Header('Content-Type', 'application/json')
    async update(@Auth() user: Users,@Body() request: UpdateUserRequst): Promise<WebResponse<UsersResponse>> {
        const result = await this.usersservice.update(user, request);
        return {
            data: result,
            message: 'Users Upadate'
        }
    }

    @Delete('/logout')
    @HttpCode(200)
    @Header('Content-Type', 'application/json')
    async logout(@Auth() user: Users): Promise<WebResponse<boolean>> {
         await this.usersservice.logout(user);
        return {
            data: true
        }
    }

}
