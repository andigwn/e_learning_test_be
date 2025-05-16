import { z, ZodType } from "zod";
const dateSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { 
    message: "Format tanggal harus YYYY-MM-DD" 
  })
  .transform(val => new Date(val));
export class GuruValidation {
    static readonly CREATE: ZodType = z.object({
        id_users: z.number().int().optional(),
        nip: z.number().int(),
        nama: z.string().min(3).max(100),
        no_hp: z.string().max(15),
        tempat: z.string(),
        tanggal_lahir: dateSchema,
        status_pegawai: z.string().max(100),
        pangkat_golongan: z.string().max(20),
        alamat: z.string().max(500),
        kode_pos: z.number().int(),
        jenis_kelamin: z.enum(['laki-laki','perempuan']),
        image: z.string().max(255).optional()
    });
    static readonly UPDATE: ZodType = z.object({
      id_guru: z.number().int().positive(),
      id_users: z.number().int().optional(),
      nip: z.number().int().optional(),
      nama: z.string().min(3).max(100).optional(),
      no_hp: z.string().max(15).optional(),
      tempat: z.string().optional(),
      tanggal_lahir: dateSchema.optional(),
      status_pegawai: z.string().max(100).optional(),
      pangkat_golongan: z.string().max(20).optional(),
      alamat: z.string().max(500).optional(),
      kode_pos: z.number().int().optional(),
      jenis_kelamin: z.enum(['laki-laki','perempuan']).optional(),
      image: z.string().max(255).optional()
    })
}