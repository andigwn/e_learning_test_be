import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationSerivice } from 'src/common/validation.service';
import { CreateSiswaRequest, SiswaResponse, UpdateSiswaRequest,  } from 'src/model/siswa.model';
import {Logger} from 'winston';
import { SiswaValidation } from './siswa.validation';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SiswaService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationSerivice
    ){}

    async create(user: Users, request: CreateSiswaRequest): Promise<SiswaResponse> {
        this.logger.info(`SiswaService.create(${JSON.stringify(user)} ${JSON.stringify(request)})`)
        const createRequest = await this.validationService.validate(SiswaValidation.CREATE, request);
        
        const prismaData = {
            ...createRequest,
            jenis_kelamin: request.jenis_kelamin === 'laki-laki' ? 'PRIA' : 'PEREMPUAN',
            id_users: user.id_users,
            tanggal_lahir: new Date(request.tanggal_lahir)
          };
          if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
    
        const siswa = await this.prismaService.siswa.create({
            data: prismaData,
            include: {
            jurusan: {
                select: {
                    nama_jurusan: true
                    }
            },
            ruangan: {
                select: {
                    nama_ruangan: true
                }
            }
        }
        });
        console.log(siswa)
        return plainToInstance (SiswaResponse, siswa)
    }

    async chechkSiswaMustExists ( siswaId: number){
        const siswa = await this.prismaService.siswa.findFirst({
            where: {
                id_siswa: siswaId,
            },
            include: {
            jurusan: {
                select: {
                    nama_jurusan: true
                    }
            },
            ruangan: {
                select: {
                    nama_ruangan: true
                }
            }
        }
        });
        if (!siswa) {
            throw new HttpException("Siswa not found", 404)
        }
        return siswa;
    }

    async get(user: Users, siswaId: number):Promise<SiswaResponse>{
        this.logger.info(`SiswaService.get(${JSON.stringify(user)} ${siswaId}`)
        

    // Fetch siswa by id_siswa and id_users
    const siswa = await this.prismaService.siswa.findFirst({
        where: {
            id_siswa: siswaId,
            id_users: user.id_users
        },
        include: {
            jurusan: {
                select: {
                    nama_jurusan: true
                    }
            },
            ruangan: {
                select: {
                    nama_ruangan: true
                }
            }
        }
    });

        return plainToInstance (SiswaResponse, siswa)
    }
    async getAllSiswa(user: Users):Promise<SiswaResponse[]>{
        this.logger.info(`SiswaService.get(${JSON.stringify(user)}`)
        const siswa = await this.prismaService.siswa.findMany({
            include: {
            jurusan: {
                select: {
                    nama_jurusan: true
                    }
            },
            ruangan: {
                select: {
                    nama_ruangan: true
                }
            }
        }
        });
        if (!user || !user.token) {
            throw new HttpException("Unauthorized", 401);
        }
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        if (!siswa || siswa.length === 0) {
            throw new HttpException("Siswa not found", 404)
        }
        return plainToInstance (SiswaResponse, siswa)
    }
    async getSiswaCurrent(user: Users):Promise<SiswaResponse[]>{
        this.logger.info(`SiswaService.get(${JSON.stringify(user)}`)
        const siswa = await this.prismaService.siswa.findMany({
            where: {
                id_users: user.id_users
            },
            include: {
            jurusan: {
                select: {
                    nama_jurusan: true
                    }
            },
            ruangan: {
                select: {
                    nama_ruangan: true
                }
            }
        }
        });
        if (!user || !user.token) {
            throw new HttpException("Unauthorized", 401);
        }
        // if (![1, 4].includes(user.id_role)) {
        //     throw new HttpException("Forbidden", 403)
        // }
        if (!siswa || siswa.length === 0) {
            throw new HttpException("Siswa not found", 404)
        }
        return plainToInstance (SiswaResponse, siswa)
    }
    async update(user: Users, request: UpdateSiswaRequest): Promise<SiswaResponse>{
        this.logger.debug(`SiswaService.update(${JSON.stringify(user)}, ${JSON.stringify(request)})`)
        const updateRequest = await this.validationService.validate(SiswaValidation.UPDATE, request)
        let siswa = await this.chechkSiswaMustExists( updateRequest.id_siswa)
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
            })
        }
        siswa = await this.prismaService.siswa.update({
            where: { id_siswa: siswa.id_siswa },
            data: updateData,
            include: {
            jurusan: {
                select: {
                    nama_jurusan: true
                    }
            },
            ruangan: {
                select: {
                    nama_ruangan: true
                }
            }
        }
        });
        return plainToInstance(SiswaResponse, siswa)
    }
    async remove(user: Users, siswaId: number): Promise<SiswaResponse> {
        await this.chechkSiswaMustExists(siswaId);
        if (![1, 4].includes(user.id_role)) {
            throw new HttpException("Forbidden", 403)
        }
        const siswa = await this.prismaService.siswa.delete({
            where:{
                id_siswa : siswaId
            }
        });
        
        return plainToInstance(SiswaResponse, siswa);
    }

}


