import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { Users } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { JadwalCreateRequest, JadwalResponse, JadwalUpdateRequest } from 'src/model/jadwal.model';
import {Logger} from 'winston';
import { JadwalValidation } from './jadwal.validation';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class JadwalService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismService: PrismaService,
        private validationService: ValidationSerivice,
    ){}
    async create(user: Users, request: JadwalCreateRequest): Promise<JadwalResponse>{
        this.logger.debug(`JadwalService.create(${JSON.stringify(user)} ${JSON.stringify(request)})`)
        const createRequest = await this.validationService.validate(JadwalValidation.CREATE, request)
        const admin = await this.prismService.admin.findFirst({
            where: {
                id_users: user.id_users
            }
        });
        if (!admin) {
            throw new HttpException("Admin not found", 404)
        }
        const jadwal = await this.prismService.jadwal.create({
            data:{
                ...createRequest
            },
            include:{
                mapel: true,
                guru: true,
                siswa: true,
                ruangan: true,
                kelas: true,
            }
        })
        return plainToInstance(JadwalResponse, jadwal)
    }
    async chekJadwalMustExists(jadwalId: number){
        const jadwal = await this.prismService.jadwal.findFirst({
            where:{
                id_jadwal: jadwalId
            }
        });
        if (!jadwal) {
            throw new HttpException("Jadwal not found", 404)
        }
        return jadwal
    }
    async getAll(user: Users,): Promise<JadwalResponse[]>{
        this.logger.debug(`JadwalService.get(${JSON.stringify(user)})`)
        const jadwal = await this.prismService.jadwal.findMany({
            include:{
                guru: true,
                siswa:true,
                kelas:true,
                mapel:true,
                ruangan:true,
            }
        });
        if (!jadwal || jadwal.length === 0) {
            throw new HttpException("Jadwal not found", 404)
        }
        return plainToInstance (JadwalResponse, jadwal)
    }
    async getById(user: Users, jadwalId: number): Promise<JadwalResponse>{
        this.logger.debug(`JadwalService.getById(${JSON.stringify(user)} ${jadwalId})`)
        const jadwal = await this.prismService.jadwal.findFirst({
            where:{
                id_jadwal: jadwalId
            },
            include:{
                guru: true,
                siswa:true,
                kelas:true,
                mapel:true,
                ruangan:true,
            }
        });
        if (!jadwal) {
            throw new HttpException("Jadwal not found", 404)
        }
        return plainToInstance (JadwalResponse, jadwal)
    }
    async update(user: Users, request: JadwalUpdateRequest): Promise<JadwalResponse>{
        this.logger.debug(`JadwalService.update(${JSON.stringify(user)} ${JSON.stringify(request)})`)
        const updateRequest = await this.validationService.validate(JadwalValidation.UPDATE, request)
        let jadwal = await this.chekJadwalMustExists(updateRequest.id_jadwal)
            jadwal = await this.prismService.jadwal.update({
            where:{
                id_jadwal: jadwal.id_jadwal
            },
            data:{
                ...updateRequest
            },
            include:{
                guru: true,
                siswa:true,
                kelas:true,
                mapel:true,
                ruangan:true,
            }
        })
        return plainToInstance (JadwalResponse, jadwal)
    }
    async remove(user: Users, jadwalId: number): Promise<JadwalResponse>{
        this.logger.debug(`JadwalService.remove(${JSON.stringify(user)} ${jadwalId})`)
        await this.chekJadwalMustExists(jadwalId)
        const jadwal = await this.prismService.jadwal.delete({
            where:{
                id_jadwal: jadwalId
            }
        });
        if (!jadwal) {
            throw new HttpException("Jadwal not found", 404)
        }
        return plainToInstance (JadwalResponse, jadwal)
    }
}
