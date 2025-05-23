import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { MapelService } from './mapel.service';
import { Roles } from 'src/common/roles.decorator';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';
import { MapelCreateRequest, MapelResponse, MapelUpdateRequest } from 'src/model/mapel.model';
import { WebResponse } from 'src/model/web.model';
import { RolesGuard } from 'src/common/roles.guard';
import { JwtAuthGuard } from 'src/common/jwt_auth.guard';

@Controller('/api/mapel')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MapelController {
    constructor(
        private  mapelService: MapelService
    ) {}

    @Post('/create')
    @HttpCode(200)
    @Roles([1,2])
    async create(
        @Auth() user: Users,
        @Body() request: MapelCreateRequest,
    ): Promise<WebResponse<MapelResponse>>{
        const result = await this.mapelService.create(user, request);
        return {
            data: result,
            message: 'Mapel created successfully',
        }
    }
    @Get('/:mapelId')
    @HttpCode(200)
    @Roles([1,2,4])
    async get(
        @Auth() user: Users,
        @Param('mapelId', ParseIntPipe) mapelId: number
    ):Promise<WebResponse<MapelResponse>>{
        
        const result = await this.mapelService.get(user, mapelId);
        return {
            data: result,
            message: 'Get Mapel Successfully',
        }
    }
    @Get()
    @HttpCode(200)
    @Roles([1,2])
    async getAllMapel(
        @Auth() user: Users
    ): Promise<WebResponse<MapelResponse[]>>{
        const result = await this.mapelService.getAllMapel(user)
        return {
            data: result,
            message: "Get All Mapel Success"
        }
    }
    @Put('/:mapelId')
    @HttpCode(200)
    @Roles([1,2])
    async update(
        @Auth() user: Users,
        @Param('mapelId', ParseIntPipe) mapelId: number,
        @Body() request: MapelUpdateRequest,
    ): Promise<WebResponse<MapelResponse>>{
        request.id_mapel = mapelId
        const result = await this.mapelService.update(user, request)
        return {
            data: result,
            message: "Upadate Mata Pelajaran Success"
        }
    }
    @Delete('/:mapelId')
    @HttpCode(200)
    @Roles([1,2])
    async remove(
        @Auth() user: Users,
        @Param('mapelId', ParseIntPipe) mapelId: number
    ): Promise<WebResponse<boolean>>{
        await this.mapelService.remove(user, mapelId)
        return{
            data: true,
            message: "Delete Mapel Success"
        }
    }
}
