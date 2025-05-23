export class RuanganResponse {
    id_ruangan: number;
    nama_ruangan: string;
    kode_ruangan: string;
}
export class RuanganCreateRequest {
    id_ruangan?: number;
    nama_ruangan: string;
    kode_ruangan: string;
}
export class RuanganUpdateRequest {
    id_ruangan: number;
    nama_ruangan?: string;
    kode_ruangan?: string;
}