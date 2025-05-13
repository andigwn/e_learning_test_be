import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MapelService } from './mapel.service';
import { Roles } from 'src/common/roles.decorator';
import { Auth } from 'src/common/auth.decorator';
import { Users } from '@prisma/client';
import { MapelCreateRequest, MapelResponse } from 'src/model/mapel.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/mapel')
export class MapelController {
    constructor(private readonly mapelService: MapelService) {}
    @Post('/create')
    @HttpCode(200)
    @Roles(1,4)
    async create(
        @Auth(['admin','superadmin']) user: Users,
        @Body() request: MapelCreateRequest,
    ): Promise<WebResponse<MapelResponse>>{
        const result = await this.mapelService.create(user,request);
        return {
            data: result,
            message: 'Mapel created successfully',
        }
    }
    @Get('/:mapelId')
    @HttpCode(200)
    @Roles(1,3,4)
    async get(
        @Auth(['admin','siswa','superadmin']) user: Users,
        @Param('mapelId', ParseIntPipe) mapelId: number
    ):Promise<WebResponse<MapelResponse>>{
        const result = await this.mapelService.get(user,mapelId)
        return {
            data: result,
            message: 'Get Mapel Successfully',
        }
    }
}
