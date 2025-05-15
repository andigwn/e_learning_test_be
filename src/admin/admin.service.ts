import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { AdminResponse, CreateAdminRequest, UpdateAdminRequest } from 'src/model/admin.model';
import {Logger} from 'winston'
import { AdminValidation } from './admin.validation';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AdminService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationSerivice,
    ){}
    async create(user: Users, request: CreateAdminRequest): Promise<AdminResponse>{
        this.logger.debug(`AdminService.create(${JSON.stringify(user)} ${JSON.stringify(request)})`)
        const createRequest = await this.validationService.validate(AdminValidation.CREATE, request)
        const totalAdminWithSameName = await this.prismaService.admin.count({
            where: {
                nama: request.nama
            }
        });
        if (totalAdminWithSameName !== 0) {
            throw new HttpException("Nama Already Exist", 400)
        }
        if (![1,4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const prismaData  = {
            ...createRequest,
            jenis_kelamin: request.jenis_kelamin === 'laki-laki' ? 'PRIA' : 'PEREMPUAN',
            id_users: user.id_users,
            tanggal_lahir: new Date(request.tanggal_lahir)
        }
        const admin = await this.prismaService.admin.create({
            data: prismaData,
        })
        return plainToInstance(AdminResponse, admin)
    }
    async checkAdminMustExists(adminId: number){
        const admin = await this.prismaService.admin.findFirst({
            where:{
                id_admin: adminId
            }
        
        });
        if (!admin){
            throw new HttpException("Admin Not Found", 404)
        }
        return admin
    }
    async get(user: Users, adminId: number): Promise<AdminResponse>{
        this.logger.debug(`AdminService.get(${JSON.stringify(user)} ${JSON.stringify(adminId)})`)
        const admin = await this.prismaService.admin.findFirst({
            where:{
                id_admin: adminId,
            }
        });
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        if (!admin){
            throw new HttpException("Admin Not Found", 404)
        }
        return plainToInstance(AdminResponse, admin)
    }
    async getAllAdmin(user: Users): Promise<AdminResponse[]>{
        this.logger.debug(`AdminService.getAllAdmin(${JSON.stringify(user)})`)
        const admin = await this.prismaService.admin.findMany({})
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        if (!admin || admin.length === 0) {
            throw new HttpException("Admin Not Found", 404)
        }
        return plainToInstance(AdminResponse, admin)

    }
    async getAdminCurrent(user: Users): Promise<AdminResponse[]>{
        this.logger.debug(`AdminService.getAdminCurrent(${JSON.stringify(user)})`)
        const admin = await this.prismaService.admin.findMany({
            where: {
                id_users: user.id_users
            }
        });
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        if (!admin || admin.length === 0) {
            throw new HttpException("Admin Not Found", 404)
        }
        return plainToInstance(AdminResponse, admin)
    }

    async update(user: Users, request: UpdateAdminRequest): Promise<AdminResponse>{
        this.logger.debug(`AdminService.udpate(${JSON.stringify(user)} ${JSON.stringify(request)})`)
        const updateRequest = await this.validationService.validate(AdminValidation.UPDATE, request)
        let admin = await this.checkAdminMustExists(updateRequest.id_admin)
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const updateData = {
            ...updateRequest,
            ...(request.tanggal_lahir && {
                tanggal_lahir: new Date(request.tanggal_lahir)
            }),
            ...(request.jenis_kelamin && {
                jenis_kelamin: request.jenis_kelamin === 'laki-laki' ? 'PRIA' : 'PEREMPUAN'
            }),
        }
        admin = await this.prismaService.admin.update({
            where:{
                id_admin: admin.id_admin
            },
            data: updateData
        })
        return plainToInstance(AdminResponse, admin)
    }
    async remove(user: Users, adminId: number):Promise<AdminResponse>{
        this.logger.debug(`AdminService.delete(${JSON.stringify(user)} ${JSON.stringify(adminId)})`)
        await this.checkAdminMustExists(adminId);
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const admin = await this.prismaService.admin.delete({
            where:{
                id_admin: adminId
            }
        });
        return plainToInstance(AdminResponse, admin)
    }
}
