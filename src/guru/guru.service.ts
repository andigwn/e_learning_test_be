import { HttpException, Inject, Injectable } from '@nestjs/common';
import {Logger} from 'winston'
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateGuruRequest, GuruResponse, UpdateGuruRequest } from 'src/model/guru.model';
import { GuruValidation } from './guru.validation';
import { Users } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GuruService {
    constructor(
        private prismaService: PrismaService,
        private validationService: ValidationSerivice,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ){}
    async create (user: Users, request: CreateGuruRequest): Promise<GuruResponse>{
        this.logger.debug(`GuruService.create(${JSON.stringify(user)} ${JSON.stringify(request)})`)
        const createRequest = await this.validationService.validate(GuruValidation.CREATE, request)
        const totalGuruWithSame = await this.prismaService.guru.count({
            where:{
                nama: createRequest.nama
            }
        });
        if (totalGuruWithSame !== 0) {
            throw new HttpException("Nama Guru Already Exist", 400)
        }
        if (![1,2].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const prismaData = {
            ...createRequest,
            jenis_kelamin: request.jenis_kelamin === 'laki-laki' ? 'PRIA' : 'PEREMPUAN',
            id_users: user.id_users,
            tanggal_lahir: new Date(request.tanggal_lahir)  
        }
        const guru = await this.prismaService.guru.create({
            data: prismaData
        })
        return plainToInstance(GuruResponse, guru);
    }
    async checkGuruMustExists (guruId:number){
        const guru = await this.prismaService.guru.findFirst({
            where:{
                id_guru: guruId
            }
        });
        if (!guru) {
            throw new HttpException("Guru Not Found", 404)
        }
        return guru;
    }
    async get(user: Users, guruId:number): Promise<GuruResponse>{
        this.logger.debug(`GuruService.get(${JSON.stringify(user)} ${guruId})`)
        if (![1,2].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const guru = await this.prismaService.guru.findFirst({
            where:{
                id_guru: guruId,
                id_users: user.id_users
            }
        });
        if (!guru) {
            throw new HttpException("Guru Not Found", 404)
        }
        return plainToInstance(GuruResponse, guru)
    }
    async getAllGuru(user: Users): Promise<GuruResponse[]>{
        this.logger.debug(`GuruService.getAllGuru(${JSON.stringify(user)})`)
        if (![1,2].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const guru = await this.prismaService.guru.findMany({})
        if (!guru || guru.length === 0) {
            throw new HttpException("Guru not found", 404)
        }
        return plainToInstance(GuruResponse, guru)
    }
    async getGuruCurrent(user: Users): Promise<GuruResponse[]>{
        this.logger.info(`GuruService.getGuruCurrent(${JSON.stringify(user)})`)
        const guru = await this.prismaService.guru.findMany({
            where:{
                id_users: user.id_users
            }
        });
         if (!guru || guru.length === 0) {
            throw new HttpException("Guru not found", 404)
        }
        return plainToInstance(GuruResponse, guru)
    }
    async update(user: Users, request: UpdateGuruRequest): Promise<GuruResponse>{
        this.logger.debug(`GuruService.update(${JSON.stringify(user)} ${JSON.stringify(request)}`)
        if (![1,2].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const updateRequest = await this.validationService.validate(GuruValidation.UPDATE, request)
        let guru = await this.checkGuruMustExists(updateRequest.id_guru)
        const updateData = {
            ...updateRequest,
            ...(request.tanggal_lahir && { 
                tanggal_lahir: new Date(request.tanggal_lahir) 
            }),
            ...(request.jenis_kelamin && {
                jenis_kelamin: request.jenis_kelamin === 'laki-laki' ? 'PRIA' : 'PEREMPUAN'
            })
        
        }
        guru = await this.prismaService.guru.update({
            where: {
                id_guru: guru.id_guru
            },
            data: updateData
        })
        return plainToInstance(GuruResponse, guru)
    }
    async remove(user: Users, guruId:number): Promise<GuruResponse>{
        this.logger.debug(`GuruService.remove(${JSON.stringify(user)} ${guruId}`)
        if (![1,2].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        await this.checkGuruMustExists(guruId)
        const guru = await this.prismaService.guru.delete({
            where: {
                id_guru: guruId
            }
        });
        return plainToInstance(GuruResponse, guru)
    }
}
