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

const dateTimeSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(.\d+)?(Z|([+-]\d{2}:\d{2}))?$/, {
    message: 'Format waktu harus ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)'
  })
  .transform(val => new Date(val));

export class JadwalValidation {
    static readonly CREATE: ZodType = z.object({
        id_mapel: z.number().int(),
        id_guru: z.number().int(),
        kode_kelas: z.string().max(11),
        hari: hariEnum,
        tipe: z.enum(['mengajar','pelajaran']),
        jam_mulai: dateTimeSchema,
        jam_selesai: dateTimeSchema,
        semester: z.enum(['Ganjil','Genap']),
        tahun_ajaran: z.string().max(9),
        status: z.enum(['aktif','nonaktif']),
    });

    static readonly UPDATE: ZodType = z.object({
        id_mapel: z.number().int().optional(),
        id_guru: z.number().int().optional(),
        kode_kelas: z.string().max(11).optional(),
        hari: hariEnum.optional(),
        tipe: z.enum(['mengajar','pelajaran']).optional(),
        jam_mulai: dateTimeSchema.optional(),
        jam_selesai: dateTimeSchema.optional(),
        semester: z.enum(['Ganjil','Genap']).optional(),
        tahun_ajaran: z.string().max(9).optional(),
        status: z.enum(['aktif','nonaktif']).optional(),
    });
}