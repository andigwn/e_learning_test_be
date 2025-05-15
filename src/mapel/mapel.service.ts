import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Admin, Users } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { MapelCreateRequest, MapelResponse, MapelUpdateRequest } from 'src/model/mapel.model';
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
        // Fetch admin by id_users
        const admin = await this.prismaService.admin.findFirst({ where: { id_users: user.id_users } });
        if (!admin) {
            throw new HttpException('Admin not found for this user', 404);
        }
        const prismaData = {
            ...createRequest,
            id_admin: admin.id_admin,
        }    
        const mapel = await this.prismaService.mataPelajaran.create({
            data: prismaData
        });
        return plainToInstance(MapelResponse, mapel);
    }
    async checkMapelMustExists ( mapelId: number){
        const mapel = await this.prismaService.mataPelajaran.findFirst({
            where: {
                id_mapel: mapelId
            },
            
        });
        if (!mapel) {
            throw new HttpException("Mapel not found", 404)
        }
        return mapel;
    }
    async get(user: Users, mapelId: number): Promise<MapelResponse>{
        this.logger.debug(`MapelService.get(${JSON.stringify(user)} ${JSON.stringify(mapelId)})`);
        const mapel = await this.checkMapelMustExists(mapelId)
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        return plainToInstance(MapelResponse, mapel);
    }
    async getAllMapel(user: Users): Promise<MapelResponse[]> {
        this.logger.debug(`MapelService.getAllMapel(${JSON.stringify(user)})`);
        if (!user || !user.token) {
            throw new HttpException("Unauthorized", 401);
        }
        
        const mapel = await this.prismaService.mataPelajaran.findMany();
        if (!mapel || mapel.length === 0) {
            throw new HttpException("Mapel Not Found", 404);
        }
        return plainToInstance(MapelResponse, mapel);
    }
    async update(user: Users, request: MapelUpdateRequest): Promise<MapelResponse>{
        this.logger.debug(`MapelService.update(${JSON.stringify(user)} ${JSON.stringify(request)})`)
        const updateRequest = await this.validationService.validate(MapelValidation.UPDATE,request)
        let mapel = await this.checkMapelMustExists(updateRequest.id_mapel)
        if (![1,4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const updateData = {
            ...updateRequest
        }

        mapel = await this.prismaService.mataPelajaran.update({
            where: {
                id_mapel: mapel.id_mapel
            },
            data: updateData
        })
        if (!mapel) {
            throw new HttpException("Mapel Not Found", 404)
        }
        return plainToInstance(MapelResponse, mapel)
    }
    async remove(user: Users, mapelId: number): Promise<MapelResponse>{
        await this.checkMapelMustExists(mapelId)
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const mapel = await this.prismaService.mataPelajaran.delete({
            where:{
                id_mapel: mapelId
            }
        });
        if (!mapel) {
            throw new HttpException("Mapel Not Found", 404)
        }
        return plainToInstance(MapelResponse, mapel)
    }
}
