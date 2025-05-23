import { z, ZodType } from "zod";

export class RuanganValidaton {
    static readonly CREATE: ZodType = z.object({
        nama_ruangan: z.string().min(1).max(20),
        kode_kelas: z.string().min(1).max(11),
    });
    static readonly UPDATE: ZodType = z.object({
        id_ruangan: z.number().int().positive(),// id_ruangan
        nama_ruangan: z.string().min(1).max(20).optional(),
        kode_kelas: z.string().min(1).max(11).optional(),
    });
}