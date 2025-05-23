import { Hari, Semester, Status, Tipe } from "@prisma/client";

export class JadwalResponse {
    id_jadwal: number;
    id_mapel: number;
    id_guru: number;
    id_siswa: number;
    kode_kelas: string;
    id_ruangan: number;
    hari: Hari;
    tipe: Tipe;
    jam_mulai: string;
    jam_selesai: string;
    semester: Semester;
    tahun_ajaran: string;
    status: Status;
}
export class JadwalCreateRequest {
  id_mapel: number;
  id_guru?: number;
  id_siswa?: number;
  kode_kelas: string;
  id_ruangan: number;
  hari: Hari;
  tipe: Tipe;
  jam_mulai: string; // Format: 'HH:mm:ss'
  jam_selesai: string; // Format: 'HH:mm:ss'
  semester: Semester;
  tahun_ajaran: string;
  status: Status;
}
export class JadwalUpdateRequest {
  id_jadwal: number;
  id_mapel?: number;
  id_guru?: number;
  id_siswa?: number;
  kode_kelas?: string;
  id_ruangan?: number;
  hari?: Hari;
  tipe?: Tipe;
  jam_mulai?: string; // Format: 'HH:mm:ss'
  jam_selesai?: string; // Format: 'HH:mm:ss'
  semester?: Semester;
  tahun_ajaran?: string;
  status?: Status;
}

export class JadwalFilterRequest {
  id_jadwal?: number;
  id_mapel?: number;
  id_guru?: number;
  id_siswa?: number;
  kode_kelas?: string;
  id_ruangan?: number;
  hari?: Hari;
  tipe?: Tipe;
  semester?: Semester;
  tahun_ajaran?: string;
  status?: Status;
}