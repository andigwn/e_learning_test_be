import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JurusanService } from './jurusan.service';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';
import { JurusanCreateRequest, JurusanResponse, JurusanUpdateRequest } from 'src/model/jurusan.model';
import { WebResponse } from 'src/model/web.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { JwtAuthGuard } from 'src/common/jwt_auth.guard';

@Controller('/api/jurusan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JurusanController {
    constructor(
        private jurusanService: JurusanService
    ){}
    @Post('/create')
    @HttpCode(200)
    @Roles([1, 2])
    async create(
        @Auth() user: Users,
        @Body() request: JurusanCreateRequest
    ): Promise<WebResponse<JurusanResponse>>{
        const result = await this.jurusanService.create(user, request)
        return {
            data: result,
            message: "Create Jurusan Success"
        }
    }
    @Get('/:kodeJurusan')
    @HttpCode(200)
    @Roles([1, 2])
    async get(
        @Auth() user: Users,
        @Param('kodeJurusan') kodeJurusan: string
    ):Promise<WebResponse<JurusanResponse>> {
        const result = await this.jurusanService.get(user, kodeJurusan)
        return {
            data: result,
            message: "Get Jurusan By Kode Jurusan Success"
        }
    }
    @Get()
    @HttpCode(200)
    @Roles([1, 2, 3, 4])
    async getAll(
        @Auth() user: Users
    ):Promise<WebResponse<JurusanResponse[]>> {
        const result = await this.jurusanService.getAll(user)
        return {
            data: result,
            message: "Get All Jurusan Success"
        }
    }
    @Put('/:kodeJurusan')
    @HttpCode(200)
    @Roles([1, 2])
    async update(
        @Auth() user: Users,
        @Param('kodeJurusan') kodeJurusan: string,
        @Body() request: JurusanUpdateRequest
    ):Promise<WebResponse<JurusanResponse>> {
        request.kode_jurusan = kodeJurusan
        const result = await this.jurusanService.update(user, request)
        return {
            data: result,
            message: "Update Jurusan Success"
        }
    }
    @Delete('/:kodeJurusan')
    @HttpCode(200)
    @Roles([1, 2])
    async delete(
        @Auth() user: Users,
        @Param('kodeJurusan') kodeJurusan: string
    ):Promise<WebResponse<boolean>> {
         await this.jurusanService.remove(user, kodeJurusan)
        return {
            data: true,
            message: "Remove Jurusan Success"
        }
    }
}
