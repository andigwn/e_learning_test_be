import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';
import { CreateSiswaRequest, SiswaResponse, UpdateSiswaRequest,  } from 'src/model/siswa.model';
import { WebResponse } from 'src/model/web.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { JwtAuthGuard } from 'src/common/jwt_auth.guard';

@Controller('/api/siswa')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SiswaController {
    constructor(private siswaService: SiswaService){}
    @Get()
    @HttpCode(200)
    @Roles([1,2])
    async getAllSiswa(
        @Auth() user: Users
    ):Promise<WebResponse<SiswaResponse[]>> {
        const result = await this.siswaService.getAllSiswa(user)
        return {
            data: result,
            message: "Get All Siswa Success"
        }
    }
    @Get('/current')
    @HttpCode(200)
    @Roles([1,2,4])
    async getSiswaCurrent(
        @Auth() user: Users
    ):Promise<WebResponse<SiswaResponse[]>> {
        const result = await this.siswaService.getSiswaCurrent(user)
        return {
            data: result,
            message: "Get Siswa Success"
        }
    }

    @Post('/create')
    @HttpCode(200)
    @Roles([1, 2])
    async create(
        @Auth() user: Users,
        @Body() request: CreateSiswaRequest
    ):Promise<WebResponse<SiswaResponse>> {
        const result = await this.siswaService.create(user, request)
        return {
            data: result,
            message: "Create Siswa Success"
        }
    }
    @Get('/:siswaId')
    @HttpCode(200)
    @Roles([1, 2, 4])
    async get(
        @Auth() user: Users,
        @Param('siswaId', ParseIntPipe) siswaId: number
    ):Promise<WebResponse<SiswaResponse>> {
        const result = await this.siswaService.get(user, siswaId)
        return {
            data: result,
            message: "Get Siswa Success"
        }
    }
    @Put('/:siswaId')
    @HttpCode(200)
    @Roles([1, 2])
    async update(
        @Auth() user: Users,
        @Param('siswaId', ParseIntPipe) siswaId: number,
        @Body() request: UpdateSiswaRequest
    ):Promise<WebResponse<SiswaResponse>> {
        request.id_siswa = siswaId
        const result = await this.siswaService.update(user, request)
        return {
            data: result,
            message: "Update Siswa Success"
        }
    }
    @Delete('/:siswaId')
    @HttpCode(200)
    @Roles([1, 2])
    async remove(
        @Auth() user: Users,
        @Param('siswaId', ParseIntPipe) siswaId: number
    ):Promise<WebResponse<boolean>> {
        await this.siswaService.remove(user, siswaId)
        return {
            data: true,
            message: "Delete Siswa Success"
        }
    }
}
