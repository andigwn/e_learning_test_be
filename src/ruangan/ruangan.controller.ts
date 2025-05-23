import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { RuanganService } from './ruangan.service';
import { WebResponse } from 'src/model/web.model';
import { RuanganCreateRequest, RuanganResponse, RuanganUpdateRequest } from 'src/model/ruangan.model';
import { Users } from '@prisma/client';
import { Auth } from 'src/common/auth.decorator';
import { JwtAuthGuard } from 'src/common/jwt_auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';

@Controller('/api/ruangan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RuanganController {
    constructor(private ruanganService: RuanganService) {}
    @Post('/create')
    @HttpCode(200)
    @Roles([1,2])
    async create(
        @Auth() user: Users,
        @Body() request: RuanganCreateRequest
    ): Promise<WebResponse<RuanganResponse>>{
        const result = await this.ruanganService.create(user, request)
        return {
            data: result,
            message: "Create Ruangan Success"
        }
    }
    @Get()
    @HttpCode(200)
    @Roles([1,2,3,4])
    async getAll(
        @Auth() user: Users
    ): Promise<WebResponse<RuanganResponse[]>>{
        const result = await this.ruanganService.getAll(user)
        return {
            data: result,
            message: "Get All Ruangan Success"
        }
    }
    @Get('/:ruanganId')
    @HttpCode(200)
    @Roles([1,2])
    async get(
        @Auth() user: Users,
        @Param('ruanganId', ParseIntPipe) ruanganId: number
    ): Promise<WebResponse<RuanganResponse>>{
        const result = await this.ruanganService.getById(user, ruanganId)
        return {
            data: result,
            message: "Get Ruangan Success"
        }
    }
    @Put('/:ruanganId')
    @HttpCode(200)
    @Roles([1,2])
    async update(
        @Auth() user: Users,
        @Param('ruanganId', ParseIntPipe) ruanganId: number,
        @Body() request: RuanganUpdateRequest
    ): Promise<WebResponse<RuanganResponse>>{
        request.id_ruangan = ruanganId
        const result = await this.ruanganService.update(user, request)
        return {
            data: result,
            message: "Update Ruangan Success"
        }
    }
    @Delete('/:ruanganId')
    @HttpCode(200)
    @Roles([1,2])
    async delete(
        @Auth() user: Users,
        @Param('ruanganId', ParseIntPipe) ruanganId: number
    ): Promise<WebResponse<RuanganResponse>>{
        const result = await this.ruanganService.remove(user, ruanganId)
        return {
            data: result,
            message: "Delete Ruangan Success"
        }
    }
}