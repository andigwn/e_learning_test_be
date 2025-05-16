import { Transform } from "class-transformer";
export class GuruResponse {
    id_guru: number;
    id_users: number;
    nama: string;
    nip: number;
    no_hp: string;
    tempat: string;
    @Transform(({value}) => value.toISOString().split('T')[0])
    tanggal_lahir: Date;
    status_pegawai: string;
    pangkat_golongan: string;
    alamat: string;
    kode_pos: number;
    jenis_kelamin: string;
    image?: string
}
export class CreateGuruRequest {
    id_users?: number;
    nama: string;
    nip: number;
    no_hp: string;
    tempat: string;
    tanggal_lahir: string;
    status_pegawai: string;
    pangkat_golongan: string;
    alamat: string;
    kode_pos: number;
    jenis_kelamin: 'laki-laki' | 'perempuan';
    image?: string
}
export class UpdateGuruRequest {
    id_guru?: number;
    id_users?: number;
    nama?: string;
    nip?: number;
    no_hp?: string;
    tempat?: string;
    tanggal_lahir?: string;
    status_pegawai?: string;
    pangkat_golongan?: string;
    alamat?: string;
    kode_pos?: number;
    jenis_kelamin?: 'laki-laki' | 'perempuan';
    image?: string
}