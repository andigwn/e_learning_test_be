import { z, ZodType } from "zod";

export const hariEnum = z.enum([
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
]);
export const tipeEnum = z.enum([
  'Mengajar',
  'Pelajaran',
]);
export const semesterEnum = z.enum([
  'Ganjil',
  'Genap'
]);
export const statusEnum = z.enum([
  'Aktif',
  'Nonaktif'
]);

const timeSchema = z.string()
  .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Format waktu harus HH:MM (00:00 - 23:59)'
  })

export class JadwalValidation {
    static readonly CREATE: ZodType = z.object({
        id_mapel: z.number().int(),
        id_guru: z.number().int().optional(),
        id_siswa: z.number().int().optional(),
        id_ruangan: z.number().int().optional(),
        kode_kelas: z.string().max(11),
        hari: hariEnum,
        tipe: tipeEnum,
        jam_mulai: timeSchema,
        jam_selesai: timeSchema,
        semester: semesterEnum,
        tahun_ajaran: z.string().max(9),
        status: statusEnum,
    });

    static readonly UPDATE: ZodType = z.object({
        id_jadwal: z.number().int(),
        id_mapel: z.number().int().optional(),
        id_guru: z.number().int().optional(),
        id_siswa: z.number().int().optional(),
        id_ruangan: z.number().int().optional(),
        kode_kelas: z.string().max(11).optional(),
        hari: hariEnum.optional(),
        tipe: tipeEnum.optional(),
        jam_mulai: timeSchema.optional(),
        jam_selesai: timeSchema.optional(),
        semester: semesterEnum.optional(),
        tahun_ajaran: z.string().max(9).optional(),
        status: statusEnum.optional(),
    });
}