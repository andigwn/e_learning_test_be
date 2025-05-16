import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { WebResponse } from 'src/model/web.model';
import { AdminResponse, CreateAdminRequest, UpdateAdminRequest } from 'src/model/admin.model';
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
    @Roles(1,2)
    async create(
        @Auth(['superadmin','admin']) user: Users,
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
    @Roles(1,2)
    async get(
        @Auth(['superadmin','admin']) user: Users,
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
    @Roles(1,2)
    async getAllAdmin(
        @Auth(['superadmin','admin']) user: Users
    ): Promise<WebResponse<AdminResponse[]>>{
        const result = await this.adminService.getAllAdmin(user)
        return{
            data: result,
            message: 'Get All Admin Successfully',
        }
    }
    @Get('/current')
    @HttpCode(200)
    @Roles(1,2)
    async getAdminCurrent(
        @Auth(['superadmin','admin']) user: Users
    ): Promise<WebResponse<AdminResponse[]>>{
        const result = await this.adminService.getAdminCurrent(user)
        return{
            data: result,
            message: 'Get Admin Successfully',
        }
    }
    @Put('/:adminId')
    @HttpCode(200)
    @Roles(1,2)
    async update(
        @Auth(['superadmin','admin',]) user: Users,
        @Param('adminId', ParseIntPipe) adminId: number,
        @Body() request: UpdateAdminRequest
    ): Promise<WebResponse<AdminResponse>>{
        request.id_admin = adminId
        const result = await this.adminService.update(user, request)
        return{
            data: result,
            message: 'Update Admin Successfully',
        }
    }
    @Delete('/:adminId')
    @HttpCode(200)
    @Roles(1,2)
    async delete(
        @Auth(['superadmin','admin',]) user: Users,
        @Param('adminId', ParseIntPipe) adminId: number
    ): Promise<WebResponse<boolean>>{
        await this.adminService.remove(user, adminId)
        return{
            data: true,
            message: 'Delete Admin Successfully',
        }
    }
}
