import { Transform } from "class-transformer";

export class SiswaResponse{
    id_siswa: number;
    id_users: number
    nama_siswa: string;
    kode_jurusan: string;
    nama_jurusan?: string;
    nis: number;
    tempat: string;
    @Transform(({ value }) => value.toISOString().split('T')[0])
    tanggal_lahir: Date;
    rt?: number;
    rw?: number;
    no_hp?: string;
    dusun?: string;
    kelurahan: string;
    kecamatan: string;
    kode_pos?: number;
    alamat: string;
    rombel: number;
    nama_ruangan?: string; 
    jenis_kelamin: string;
    image: string
}

export class CreateSiswaRequest{
    id_users?: number
    nama_siswa: string;
    nama_jurusan: string;
    nis: number;
    tempat: string;
    tanggal_lahir: string;
    rt?: number;
    rw?: number;
    no_hp: string
    dusun?: string;
    kelurahan: string;
    kecamatan: string;
    kode_pos?: number;
    alamat: string;
    rombel: number;
    jenis_kelamin:'laki-laki' | 'perempuan';
    image: string
}

export class UpdateSiswaRequest {
    id_siswa : number;
    id_users?: number
    nama_siswa?: string;
    nama_jurusan?: string;
    nis?: number;
    tempat?: string;
    tanggal_lahir?: string;
    rt?: number;
    rw?: number;
    no_hp?: string
    dusun?: string;
    kelurahan?: string;
    kecamatan?: string;
    kode_pos?: number;
    alamat?: string;
    rombel?: number;
    jenis_kelamin?:'laki-laki' | 'perempuan';
    image?: string
}