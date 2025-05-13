import { z, ZodType } from "zod";

export class JurusanValidation {
    static readonly CREATE: ZodType = z.object({
        kode_jurusan: z.string().min(3),
        nama_jurusan: z.string().min(3),
    });
    static readonly UPDATE: ZodType = z.object({
        kode_jurusan: z.string().min(3).optional(),
        nama_jurusan: z.string().min(3).optional(),
    });
}