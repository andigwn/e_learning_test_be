import { z, ZodType } from 'zod';
const dateSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, { 
    message: "Format tanggal harus YYYY-MM-DD" 
  })
  .transform(val => new Date(val));

export class SiswaValidation {
    static readonly CREATE: ZodType = z.object({
      id_users: z.number().int().optional(),
      nama_jurusan: z.string().min(1).max(25),
      nis: z.number().int(),
      nama_siswa: z.string().min(1).max(100),
      tempat: z.string().min(1),
      tanggal_lahir: dateSchema,
      rt: z.number().int().optional(),
      rw: z.number().int().optional(),
      dusun: z.string().max(100).optional(),
      kelurahan: z.string().min(1).max(100),
      kecamatan: z.string().min(1).max(100),
      kode_pos: z.number().int().positive().optional(),
      no_hp: z.string().min(1).max(15),
      alamat: z.string().min(1).max(500),
      rombel: z.number().int(),
      jenis_kelamin: z.enum(['laki-laki', 'perempuan']),
      image: z.string().min(1).max(255).optional(),
    });
  
    static readonly UPDATE: ZodType = z.object({
      id_siswa: z.number().int().positive(),
      id_users: z.number().int().optional(),
      nama_jurusan: z.string().min(1).max(25).optional(),
      nis: z.number().int().positive().optional(),
      nama_siswa: z.string().min(1).max(100).optional(),
      tempat: z.string().min(1).optional(),
      tanggal_lahir: dateSchema.optional(),
      rt: z.number().int().positive().optional(),
      rw: z.number().int().positive().optional(),
      dusun: z.string().max(100).optional(),
      kelurahan: z.string().min(1).max(100).optional(),
      kecamatan: z.string().min(1).max(100).optional(),
      kode_pos: z.number().int().positive().optional(),
      no_hp: z.string().min(1).max(15).optional(),
      alamat: z.string().min(1).max(500).optional(),
      rombel: z.number().int().positive().optional(),
      jenis_kelamin: z.enum(['laki-laki', 'perempuan']).optional(),
      image: z.string().min(1).max(255).optional(),
    });
  }