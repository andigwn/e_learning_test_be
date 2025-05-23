import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GuruService } from './guru.service';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';
import { CreateGuruRequest, GuruResponse, UpdateGuruRequest } from 'src/model/guru.model';
import { WebResponse } from 'src/model/web.model';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { JwtAuthGuard } from 'src/common/jwt_auth.guard';

@Controller('/api/guru')
@UseGuards(JwtAuthGuard,RolesGuard)
export class GuruController {
    constructor(private  guruService: GuruService) {}
    @Get()
    @HttpCode(200)
    @Roles([1,2])
    async getAll(
        @Auth() user: Users
    ): Promise<WebResponse<GuruResponse[]>>{
        const result = await this.guruService.getAllGuru(user)
        return {
            data: result,
            message: "Get Guru Success"
        }
    }
    @Post('/create')
    @HttpCode(200)
    @Roles([1,2])
    async create(
        @Auth() user: Users,
        @Body() request: CreateGuruRequest
    ): Promise<WebResponse<GuruResponse>>{
        const result = await this.guruService.create(user, request)
        return {
            data: result,
            message: "Create Guru Success"
        }
    }
    @Get('/current')
    @HttpCode(200)
    @Roles([1,2,3])
    async getGuruCurrent(
        @Auth() user: Users
    ):Promise<WebResponse<GuruResponse[]>>{
        const result = await this.guruService.getGuruCurrent(user)
        return {
            data: result,
            message: "Get Guru current Success"
        }
    }

    @Get('/:guruId')
    @HttpCode(200)
    @Roles([1,2,3])
    async get(
        @Auth() user: Users,
        @Param('guruId', ParseIntPipe) guruId:number
    ): Promise<WebResponse<GuruResponse>>{
        const result = await this.guruService.get(user, guruId)
        return {
            data: result,
            message: "Get Guru Success"
        }
    }
    @Put('/:guruId')
    @HttpCode(200)
    @Roles([1,2])
    async update(
        @Auth() user: Users,
        @Body() request: UpdateGuruRequest,
        @Param('guruId', ParseIntPipe) guruId: number
    ): Promise<WebResponse<GuruResponse>>{
        request.id_guru = guruId
        const result = await this.guruService.update(user, request)
        return {
            data: result,
            message: "Update Guru Success"
        }
    }
    @Delete('/:guruId')
    @HttpCode(200)
    @Roles([1,2])
    async remove(
        @Auth() user: Users,
        @Param('guruId', ParseIntPipe) guruId: number
    ): Promise<WebResponse<boolean>>{
        await this.guruService.remove(user,guruId)
        return {
            data: true,
            message: "Delete Guru Success"
        }
    }
}
