import { Transform } from "class-transformer";

export class AdminResponse {
    id_admin: number;
    id_users: number;
    nama: string;
    nip: number;
    no_hp: string;
    alamat: string;
    jenis_kelamin: string;
    jenis_ptk: string;
    kode_pos: number;
    pangkat_golongan: string;
    status_pegawai: string
    tempat: string;
    @Transform(({ value }) => value.toISOString().split('T')[0])
    tanggal_lahir: Date;
    image?: string
}

export class CreateAdminRequest {
    id_users?: number;
    nama: string;
    nip: number;
    no_hp: string;
    alamat: string;
    jenis_kelamin: 'laki-laki' | 'perempuan';
    jenis_ptk: string;
    kode_pos: number;
    pangkat_golongan: string;
    status_pegawai: string
    tempat: string;
    tanggal_lahir: string;
    image?: string
}
export class UpdateAdminRequest {
    id_admin?: number;
    id_users?: number;
    nama?: string;
    nip?: number;
    no_hp?: string;
    alamat?: string;
    jenis_kelamin?: 'laki-laki' | 'perempuan';
    jenis_ptk?: string;
    kode_pos?: number;
    pangkat_golongan?: string;
    status_pegawai?: string
    tempat?: string;
    tanggal_lahir?: string;
    image?: string
}