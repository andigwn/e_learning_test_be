import { ConflictException, HttpException, Inject, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { RuanganCreateRequest, RuanganResponse, RuanganUpdateRequest } from 'src/model/ruangan.model';
import {Logger} from 'winston'
import { RuanganValidaton } from './ruangan.validation';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RuanganService {
    constructor(
        private prismaService: PrismaService,
        private validationService: ValidationSerivice,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ) {}
    async create(user: Users, request: RuanganCreateRequest): Promise<RuanganResponse> {
        this.logger.debug(`RuanganService.create(${JSON.stringify(user)} ${JSON.stringify(request)})`);
        const createRequest = await this.validationService.validate(RuanganValidaton.CREATE, request);
        const existingRuangan = await this.prismaService.ruangan.findFirst({
            where: {
                nama_ruangan: createRequest.nama_ruangan
            }
        });
        if (existingRuangan) {
            throw new ConflictException('Ruangan dengan nama tersebut sudah ada');
        }
        const prismaData = {
            ...createRequest,
        }
        const ruangan = await this.prismaService.ruangan.create({
            data: prismaData,
            include:{
                kelas: true,
            }
        });
        return plainToInstance(RuanganResponse, ruangan);
    }
    async checkRuanganMustExists (ruanganId: number){
        const ruangan = await this.prismaService.ruangan.findFirst({
            where: {
                id_ruangan: ruanganId
            },
            include: {
                kelas: true,
            }
        });
        if (!ruangan) {
            throw new HttpException("Ruangan not found", 404)
        }
        return ruangan;
    }
    async getAll(user: Users): Promise<RuanganResponse[]> {
        this.logger.debug(`RuanganService.getAll(${JSON.stringify(user)})`);
        const ruangan = await this.prismaService.ruangan.findMany({
            include: {
                kelas: true,
            }
        });
        if (!ruangan || ruangan.length === 0) {
            throw new HttpException("Ruangan Not Found", 404);
        }
        return plainToInstance(RuanganResponse, ruangan);
    }
    async getById(user: Users, ruanganId: number): Promise<RuanganResponse> {
        this.logger.debug(`RuanganService.getById(${JSON.stringify(user)} ${ruanganId})`);
        const ruangan = await this.checkRuanganMustExists(ruanganId);
        return plainToInstance(RuanganResponse, ruangan);
    } 
    async update(user: Users, request: RuanganUpdateRequest): Promise<RuanganResponse> {
        this.logger.debug(`RuanganService.update(${JSON.stringify(user)} ${JSON.stringify(request)})`);
        const updateRequest = await this.validationService.validate(RuanganValidaton.UPDATE, request);
        let ruangan = await this.checkRuanganMustExists(updateRequest.id_ruangan);
        const prismaData = {
            ...updateRequest,
        }
         ruangan = await this.prismaService.ruangan.update({
            where: {
                id_ruangan: updateRequest.id_ruangan
            },
            data: prismaData,
            include:{
                kelas: true,
            }
        });
        return plainToInstance(RuanganResponse, ruangan);
    }
    async remove(user: Users, ruanganId: number): Promise<RuanganResponse> {
        this.logger.debug(`RuanganService.remove(${JSON.stringify(user)} ${ruanganId})`);
        await this.checkRuanganMustExists(ruanganId);
        const ruangan = await this.prismaService.ruangan.delete({
            where: {
                id_ruangan: ruanganId
            },
            include:{
                kelas: true,
            }
        });
        return plainToInstance(RuanganResponse, ruangan);
    }
}
