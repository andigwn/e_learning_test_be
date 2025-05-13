import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { JurusanService } from './jurusan.service';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';
import { JurusanCreateRequest, JurusanResponse, JurusanUpdateRequest } from 'src/model/jurusan.model';
import { WebResponse } from 'src/model/web.model';
import { Roles } from 'src/common/roles.decorator';

@Controller('/api/jurusan')
export class JurusanController {
    constructor(
        private jurusanService: JurusanService
    ){}
    @Post('/create')
    @HttpCode(200)
    @Roles(1,4)
    async create(
        @Auth(['admin', 'superadmin']) user: Users,
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
    @Roles(1, 4)
    async get(
        @Auth(['admin','superadmin']) user: Users,
        @Param('kodeJurusan') kodeJurusan : string
    ):Promise<WebResponse<JurusanResponse>> {
        const result = await this.jurusanService.get(user, kodeJurusan)
        return {
            data: result,
            message: "Get Jurusan By Kode Jurusan Success"
        }
    }
    @Get()
    @HttpCode(200)
    @Roles(1, 4)
    async getAll(
        @Auth(['admin','superadmin']) user: Users
    ):Promise<WebResponse<JurusanResponse[]>> {
        const result = await this.jurusanService.getAll(user)
        return {
            data: result,
            message: "Get All Jurusan Success"
        }
    }
    @Put('/:kodeJurusan')
    @HttpCode(200)
    @Roles(1, 4)
    async update(
        @Auth(['admin','superadmin']) user: Users,
        @Param('kodeJurusan') kodeJurusan : string,
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
    @Roles(1, 4)
    async delete(
        @Auth(['admin','superadmin']) user: Users,
        @Param('kodeJurusan') kodeJurusan : string
    ):Promise<WebResponse<boolean>> {
         await this.jurusanService.remove(user, kodeJurusan)
        return {
            data: true,
            message: "Remove Jurusan Success"
        }
    }
}
