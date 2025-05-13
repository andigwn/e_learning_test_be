import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { WebResponse } from 'src/model/web.model';
import { AdminResponse, CreateAdminRequest } from 'src/model/admin.model';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';
import { Roles } from 'src/common/roles.decorator';

@Controller('/api/admin')
export class AdminController {
    constructor(
        private adminService: AdminService
    ){}

    @Post('/create')
    @HttpCode(200)
    @Roles(1,4)
    async create(
        @Auth(['admin','superadmin']) user: Users,
        @Body() request: CreateAdminRequest
    ): Promise<WebResponse<AdminResponse>>{
        const result = await this.adminService.create(user,request)
        return{
            data: result,
            message: 'Admin created successfully',
        }
    }
    @Get('/:adminId')
    @HttpCode(200)
    @Roles(1,4)
    async get(
        @Auth(['admin','superadmin']) user: Users,
        @Param('adminId',ParseIntPipe) adminId: number
    ):Promise<WebResponse<AdminResponse>>{
        const result = await this.adminService.get(user,adminId)
        return{
            data: result,
            message: 'Get Admin Successfully',
            }
    }
    @Get()
    @HttpCode(200)
    @Roles(1,4)
    async getAllAdmin(
        @Auth(['admin','superadmin']) user: Users
    ): Promise<WebResponse<AdminResponse[]>>{
        const result = await this.adminService.getAllAdmin(user)
        return{
            data: result,
            message: 'Get All Admin Successfully',
        }
    }
    @Get('/current')
    @HttpCode(200)
    @Roles(1,4)
    async getAdminCurrent(
        @Auth(['admin','superadmin']) user: Users
    ): Promise<WebResponse<AdminResponse[]>>{
        const result = await this.adminService.getAdminCurrent(user)
        return{
            data: result,
            message: 'Get Admin Successfully',
        }
    }
}
