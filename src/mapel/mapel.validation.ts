import { z, ZodType } from "zod";

export class MapelValidation {
    static readonly CREATE:ZodType = z.object({
        nama_mapel : z.string().min(3).max(50)
    });
    static readonly UPDATE: ZodType = z.object({
        nama_mapel: z.string().min(3).max(50).optional(),
    })
}