import { ConflictException, HttpException, Inject, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { JurusanCreateRequest, JurusanResponse, JurusanUpdateRequest } from 'src/model/jurusan.model';
import {Logger} from "winston"
import { JurusanValidation } from './jurusan.vallidation';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class JurusanService {
    constructor(
       @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
       private prismaService : PrismaService,
       private validationService : ValidationSerivice
    ){}

    async create(user: Users, request: JurusanCreateRequest): Promise<JurusanResponse>{
        this.logger.debug(`JurusanService.create(${JSON.stringify(user)} ${JSON.stringify(request)})`);
        const  createRequest: JurusanCreateRequest = await this.validationService.validate(JurusanValidation.CREATE, request)
        const existingJurusan = await this.prismaService.jurusan.findFirst({
            where: {
                nama_jurusan: createRequest.nama_jurusan
            }
        });
        

        if (existingJurusan) {
            throw new ConflictException('Jurusan dengan nama tersebut sudah ada');
        }
        
        const prismaData = {
            ...createRequest,
            id_users: user.id_users
        }
        const jurusan = await this.prismaService.jurusan.create({
            data: prismaData
        });
        return plainToInstance(JurusanResponse, jurusan)
    }
    async get(user: Users, kodeJurusan: string): Promise<JurusanResponse> {
        this.logger.debug(`JurusanService.get(${JSON.stringify(user)})`);
        const jurusan = await this.prismaService.jurusan.findFirst({
            where: {
                kode_jurusan: kodeJurusan,
            }
        });
        if (!jurusan) {
            throw new HttpException("Jurusan not found", 404)
        }
        return plainToInstance (JurusanResponse, jurusan)
    }
    async getAll(user: Users): Promise<JurusanResponse[]> {
        this.logger.debug(`JurusanService.getAll()`);
        if (!user || !user.token) {
            throw new HttpException("Unauthorized", 401);
        }
        const jurusan = await this.prismaService.jurusan.findMany();
        if (!jurusan || jurusan.length === 0) {
            throw new HttpException("Jurusan not found", 404)
        }
        return plainToInstance (JurusanResponse, jurusan)
    }

    async update(user: Users, request: JurusanUpdateRequest): Promise<JurusanResponse>{
        this.logger.debug(`JurusanService.update(${JSON.stringify(user)} ${JSON.stringify(request)})`);
        const updateRequest = await this.validationService.validate(JurusanValidation.UPDATE, request)
        let jurusan = await this.prismaService.jurusan.findFirst({
            where: {
                kode_jurusan: updateRequest.kode_jurusan,
            }
        });
        if (!jurusan) {
            throw new HttpException("Jurusan not found", 404)
        }
        const updatePrismaData = {
            ...updateRequest,
            id_users: user.id_users
        }
        jurusan = await this.prismaService.jurusan.update({
            where: {
                kode_jurusan: updateRequest.kode_jurusan
            },
            data: updatePrismaData
        });
    
        // Return the updated jurusan
        return plainToInstance(JurusanResponse, jurusan);
    }
    async remove(user: Users, kodeJurusan: string): Promise<JurusanResponse> {
            let jurusan = await this.prismaService.jurusan.findFirst({
                where: {
                    kode_jurusan: kodeJurusan
                }
            })
            if (!jurusan) {
                throw new HttpException("Jurusan not found", 404)
            }
            
             jurusan = await this.prismaService.jurusan.delete({
                where:{
                    kode_jurusan: kodeJurusan
                }
            });
            
            return plainToInstance(JurusanResponse, jurusan);
        }
}
