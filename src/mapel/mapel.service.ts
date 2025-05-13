import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { MapelCreateRequest, MapelResponse } from 'src/model/mapel.model';
import {Logger} from 'winston'
import { MapelValidation } from './mapel.validation';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MapelService {
    constructor(
       @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
       private prismaService: PrismaService,
       private validationService: ValidationSerivice
    ){}
    async create(user: Users, request: MapelCreateRequest): Promise<MapelResponse>{
        this.logger.debug(`MapelService.create(${JSON.stringify(user)} ${JSON.stringify(request)})`);
        const createRequest = await this.validationService.validate(MapelValidation.CREATE, request);
        if (![1, 4].includes(user.id_role)) {
                    throw new HttpException("Forbidden", 403)
        }
        const prismaData = {
            ...createRequest,
            id_users: user.id_users
        }    
        const mapel = await this.prismaService.mataPelajaran.create({
            data: prismaData
            
        });
        return plainToInstance(MapelResponse, mapel);
    }
    async get(user: Users, mapelId: number): Promise<MapelResponse>{
        this.logger.debug(`MapelService.get(${JSON.stringify(user)} ${JSON.stringify(mapelId)})`);
        const mapel = await this.prismaService.mataPelajaran.findFirst({
            where:{
                id_mapel: mapelId,
                id_users: user.id_users
            }
        });
        if (!mapel) {
            throw new HttpException('Mapel Not Found', 404)
        }
        return plainToInstance(MapelResponse, mapel);
    }
}
