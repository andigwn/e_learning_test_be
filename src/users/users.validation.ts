import { z, ZodType } from "zod";

export class UsersValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(8).max(255),
        id_role: z.number().min(1).max(11),
    })
    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(8).max(255),
    })
    static readonly UPDATE: ZodType = z.object({
        id_role: z.number().int().optional(),
        password: z.string().min(8).max(255).optional(),
    })
}

