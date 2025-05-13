import { z, ZodType } from "zod";
const dateSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { 
    message: "Format tanggal harus YYYY-MM-DD" 
  })
  .transform(val => new Date(val));
export class AdminValidation{
    static readonly CREATE: ZodType = z.object({
        id_users: z.number().optional(),
        nama: z.string().min(1).max(100),
        nip: z.number().int(),
        no_hp: z.string().max(15),
        alamat: z.string().max(500),
        jenis_kelamin: z.enum(['laki-laki', 'perempuan']),
        jenis_ptk: z.string().max(100),
        kode_pos: z.number().int(),
        pangkat_golongan: z.string().max(20),
        status_pegawai: z.string().max(100),
        tempat: z.string(),
        tanggal_lahir: dateSchema,
        image: z.string()
    });
     static readonly UPDATE: ZodType = z.object({
        id_admin: z.number().int().optional(),
        id_users: z.number().optional(),
        nama: z.string().min(1).max(100).optional(),
        nip: z.number().int().optional(),
        no_hp: z.string().max(15).optional(),
        alamat: z.string().max(500).optional(),
        jenis_kelamin: z.enum(['laki-laki', 'perempuan']).optional(),
        jenis_ptk: z.string().max(100).optional(),
        kode_pos: z.number().int().optional(),
        pangkat_golongan: z.string().max(20).optional(),
        status_pegawa: z.string().max(100).optional(),
        tempat: z.string().optional(),
        tanggal_lahir: dateSchema.optional(),
        image: z.string().optional()
        });
}