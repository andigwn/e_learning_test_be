export class JurusanResponse {
    kode_jurusan: string;
    nama_jurusan: string;
    id_users?: number
    
}

export class JurusanCreateRequest {
    kode_jurusan: string;
    nama_jurusan: string
}
export class JurusanUpdateRequest {
    kode_jurusan: string;
    nama_jurusan?: string
}