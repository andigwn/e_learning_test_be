import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JadwalService } from './jadwal.service';
import { JadwalCreateRequest, JadwalResponse, JadwalUpdateRequest } from 'src/model/jadwal.model';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';
import { Roles } from 'src/common/roles.decorator';
import { WebResponse } from 'src/model/web.model';
import { RolesGuard } from 'src/common/roles.guard';
import { JwtAuthGuard } from 'src/common/jwt_auth.guard';

@Controller('/api/jadwal')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JadwalController {
    constructor(
        private jadwalService: JadwalService
    ){}
    @Get()
    @HttpCode(200)
    @Roles([1,2,3,4])
    async getAll(
        @Auth() user: Users
    ):Promise<WebResponse<JadwalResponse[]>>{
        const result = await this.jadwalService.getAll(user)
        return{
            data: result,
            message: "Semua data jadwal"
        }
    }
    @Get('/:jadwalId')
    @HttpCode(200)
    @Roles([1,2])
    async getById(
        @Auth() user: Users,
        @Param('jadwalId', ParseIntPipe) jadwalId: number
    ):Promise<WebResponse<JadwalResponse>>{
        const result = await this.jadwalService.getById(user, jadwalId)
        return{
            data: result,
            message: "Get Jadwal By Id Success"
        }
    }
    @Post('/create')
    @HttpCode(200)
    @Roles([1,2])
    async create(
        @Auth() user: Users,
        @Body() request: JadwalCreateRequest
    ): Promise<WebResponse<JadwalResponse>>{
        const result = await this.jadwalService.create(user, request)
        return {
            data: result,
            message: "Create Jadwal Success"
        }
    }
    @Put('/:jadwalId')
    @HttpCode(200)
    @Roles([1,2])
    async update(
        @Auth() user: Users,
        @Param('jadwalId', ParseIntPipe) jadwalId: number,
        @Body() request: JadwalUpdateRequest
    ): Promise<WebResponse<JadwalResponse>>{
        request.id_jadwal = jadwalId
        const result = await this.jadwalService.update(user,request)
        return {
            data: result,
            message: "Update Jadwal Success"
        }
    }
    @Delete('/:jadwalId')
    @HttpCode(200)
    @Roles([1,2])
    async delete(
        @Auth() user: Users,
        @Param('jadwalId', ParseIntPipe) jadwalId: number
    ): Promise<WebResponse<boolean>>{
        await this.jadwalService.remove(user, jadwalId)
        return {
            data: true,
            message: "Delete Jadwal Success"
        }
    }
}
