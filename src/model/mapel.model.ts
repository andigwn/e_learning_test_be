export class MapelResponse {
    id_mapel : number;
    id_admin : number;
    nama_mapel : string;
}
export class MapelCreateRequest {
    id_mapel? : number;
    id_admin?: number;
    nama_mapel : string;
}
export class MapelUpdateRequest {
    id_mapel? : number;
    id_admin? : number;
    nama_mapel? : string;
}